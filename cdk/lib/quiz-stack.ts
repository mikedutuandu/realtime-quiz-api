import {
    aws_autoscaling,
    aws_ec2,
    aws_elasticloadbalancingv2,
    Stack,
    StackProps,
    aws_ecs,
} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {SubnetType, Vpc} from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import {Secret} from "aws-cdk-lib/aws-secretsmanager";

export interface QuizProps extends StackProps {
    vpcId: string;
    image: string;
    instanceType: string;
    certificateArn: string,
    autoScalingGroupMinCapacity: number;
    autoScalingGroupMaxCapacity: number;
    autoScalingGroupDesiredCapacity: number;
    taskDefinitionMemoryLimitMiB: number;
    taskDefinitionCpu: number;
    envSecretName: string;
    ecsMinCapacity: number,
    ecsMaxCapacity: number,
    ecsDesiredCount: number,
    taskEnv: string[]
}

export class QuizStack extends Stack {
    constructor(scope: Construct, id: string, props: QuizProps) {
        super(scope, id, props);

        const vpc = Vpc.fromLookup(this, 'QuizNetworkVPC', {
            vpcId: props.vpcId,
        });

        // 1. Create an ECS cluster
        const sg_cluster = new aws_ec2.SecurityGroup(this, 'QuizSgCluster', {vpc: vpc});
        sg_cluster.addIngressRule(aws_ec2.Peer.ipv4('0.0.0.0/0'), aws_ec2.Port.allTraffic());
        sg_cluster.addEgressRule(aws_ec2.Peer.ipv4('0.0.0.0/0'), aws_ec2.Port.allTraffic());
        const autoScalingGroup = new aws_autoscaling.AutoScalingGroup(this, 'QuizAsg', {
            vpc,
            instanceType: new aws_ec2.InstanceType(props.instanceType),
            machineImage: aws_ecs.EcsOptimizedImage.amazonLinux2(),
            userData: aws_ec2.UserData.forLinux(),
            minCapacity: props.autoScalingGroupMinCapacity,
            maxCapacity: props.autoScalingGroupMaxCapacity,
            desiredCapacity: props.autoScalingGroupDesiredCapacity,
            securityGroup: sg_cluster
        });
        const capacityProvider = new aws_ecs.AsgCapacityProvider(this, 'QuizAsgCapacityProvider', {
            autoScalingGroup,
        });
        const cluster = new aws_ecs.Cluster(this, 'QuizEcsCluster', {
            vpc,
        });
        cluster.addAsgCapacityProvider(capacityProvider);

        //2. Create ECS task
        const appSecret = Secret.fromSecretNameV2(this, 'QuizEnvSecret', props.envSecretName);

        const taskEnv: any = {}
        props.taskEnv.forEach(v => {
            taskEnv[v] = aws_ecs.Secret.fromSecretsManager(appSecret, v)
        })

        const role = new iam.Role(this, 'QuizRole', {
            assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
            description: 'An IAM role in AWS CDK',
            managedPolicies: [
                iam.ManagedPolicy.fromManagedPolicyArn(this, "AmazonECSTaskExecutionRolePolicy",
                    'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy',
                )
            ],
        });
        //for api
        const taskDefinition = new aws_ecs.Ec2TaskDefinition(this, 'QuizEcsTaskDef', {
            executionRole: role,
            taskRole: role,
            networkMode: aws_ecs.NetworkMode.BRIDGE,
        });

        taskDefinition.addContainer('QuizContainer', {
            containerName: "quiz-api",
            image: aws_ecs.ContainerImage.fromRegistry(props.image),
            logging: aws_ecs.LogDrivers.awsLogs({streamPrefix: 'QuizLogs', logRetention: 30}),
            memoryLimitMiB: props.taskDefinitionMemoryLimitMiB,
            cpu: props.taskDefinitionCpu,
            portMappings: [
                {
                    containerPort: 4000,
                    hostPort: 0, // ALLOW  multiple containers can run on same EC2 Instance when you leave the hostPort in the container definition empty or ‘0’ dynamic host port mapping will be used.
                    protocol: aws_ecs.Protocol.TCP,
                }
            ],
            secrets: taskEnv,
            environment: {
                "IS_CRON_JOB":"false"
            }
        });
        //for cron
        const taskDefinitionCron = new aws_ecs.Ec2TaskDefinition(this, 'QuizEcsTaskDefCron', {
            executionRole: role,
            taskRole: role,
            networkMode: aws_ecs.NetworkMode.BRIDGE,
        });
        taskDefinitionCron.addContainer('QuizContainerCron', {
            containerName: "quiz-cron",
            image: aws_ecs.ContainerImage.fromRegistry(props.image),
            logging: aws_ecs.LogDrivers.awsLogs({streamPrefix: 'QuizLogsCron', logRetention: 30}),
            memoryLimitMiB: props.taskDefinitionMemoryLimitMiB,
            cpu: props.taskDefinitionCpu,
            secrets: taskEnv,
            environment: {
                "IS_CRON_JOB":"true"
            }
        });


        //3. Create ECS Service
        //for api
        const ecsService = new aws_ecs.Ec2Service(this, 'QuizEcsService', {
            cluster,
            taskDefinition,
            desiredCount: props.ecsDesiredCount
        });
        ecsService.autoScaleTaskCount({minCapacity: props.ecsMinCapacity, maxCapacity: props.ecsMaxCapacity})

        //for cron
        new aws_ecs.Ec2Service(this, 'QuizEcsServiceCron', {
            cluster,
            taskDefinition: taskDefinitionCron,
            desiredCount: 1
        });

        //4.Create ALB
        const sg_alb = new aws_ec2.SecurityGroup(this, 'QuizSgAlb', {vpc: vpc});
        sg_alb.addIngressRule(aws_ec2.Peer.ipv4('0.0.0.0/0'), aws_ec2.Port.allTraffic());
        sg_alb.addEgressRule(aws_ec2.Peer.ipv4('0.0.0.0/0'), aws_ec2.Port.allTraffic());
        const alb = new aws_elasticloadbalancingv2.ApplicationLoadBalancer(this, 'QuizAlb', {
            vpc,
            securityGroup: sg_alb,
            internetFacing: true,
        })
        const alb_listener = alb.addListener('QuizAlbListener', {
            certificates: [aws_elasticloadbalancingv2.ListenerCertificate.fromArn(props.certificateArn)],
            port: 443,
        });
        alb_listener.addTargets(`QuizAlbTargets`, {
            protocol: aws_elasticloadbalancingv2.ApplicationProtocol.HTTP,
            targets: [ecsService.loadBalancerTarget({
                containerPort: 4000,
                containerName: "quiz-api",
            })]
        });
    }
}
