#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {QuizStack} from '../lib/quiz-stack';
import {aws_ecs} from "aws-cdk-lib";

const app = new cdk.App();
new QuizStack(app, 'QuizStack11', {
    env: {
        account: "803036668764",
        region: "ap-southeast-1"
    },
    //vpc network
    vpcId: 'vpc-05d9080dcbae6c805',

    //certificate aws for https
    certificateArn: "arn:aws:acm:ap-southeast-1:803036668764:certificate/378646cc-5e8f-4dad-ac15-79416e99a254",

    //config auto scale group
    autoScalingGroupMinCapacity: 1,
    autoScalingGroupMaxCapacity: 50,
    autoScalingGroupDesiredCapacity: 1,
    instanceType: 't3.medium',

    //config instance for api task, instance for cron task have only one instance
    ecsMinCapacity: 2,
    ecsMaxCapacity: 100,
    ecsDesiredCount: 2,

    //task definition
    image: '803036668764.dkr.ecr.ap-southeast-1.amazonaws.com/quiz-api:latest',
    taskDefinitionMemoryLimitMiB: 512,
    taskDefinitionCpu: 256,
    envSecretName: "quizApiEnv",
    taskEnv: [
        "NODE_ENV",
        "APP_NAME",
        "APP_HOST",
        "APP_PORT",
        "APP_LOGGER_LEVEL",
        "APP_CORS_ORIGIN",

        "TYPEORM_CONNECTION",
        "TYPEORM_HOST",
        "TYPEORM_PORT",
        "TYPEORM_USERNAME",
        "TYPEORM_PASSWORD",
        "TYPEORM_DATABASE",
        "TYPEORM_MIGRATIONS_RUN",
        "TYPEORM_LOGGING",
        "TYPEORM_SYNCHRONIZE",
        "TYPEORM_DROP_SCHEMA",

        "APP_JWT_PUBLIC_KEY_BASE64",
        "APP_JWT_PRIVATE_KEY_BASE64",
        "APP_JWT_EXPIRES",

        "MAILGUN_DOMAIN",
        "MAILGUN_API_KEY",
        "FROM_EMAIL",

        "REDIS_URL",
        "SWAGGER_ENABLE"
    ],

});
