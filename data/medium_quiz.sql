-- Insert the Quiz
INSERT INTO quizzes (name, participants, difficulty, time_limit) VALUES
    ('Comprehensive English Quiz', 0, 'Medium', 300);

-- Insert 20 Questions
INSERT INTO quiz_questions (question_text, quiz_id) VALUES
                                                        ('What is the correct spelling?', 1),
                                                        ('Choose the correct plural form:', 1),
                                                        ('Which word is a verb?', 1),
                                                        ('Select the correct pronoun: "_____ are going to the park."', 1),
                                                        ('Which sentence is grammatically correct?', 1),
                                                        ('What is the past tense of "eat"?', 1),
                                                        ('Choose the correct homophone: "I ___ my lunch."', 1),
                                                        ('Which word is an adjective?', 1),
                                                        ('Select the correct possessive form:', 1),
                                                        ('What is the opposite of "hot"?', 1),
                                                        ('Identify the correct use of a semicolon:', 1),
                                                        ('Choose the correct synonym for "benevolent":', 1),
                                                        ('What is the correct form of the verb in: "Neither of the options ___ appealing."', 1),
                                                        ('Identify the sentence with correct subject-verb agreement:', 1),
                                                        ('Which sentence demonstrates the correct use of the past perfect tense?', 1),
                                                        ('Choose the appropriate transition word: "_____, the project was completed on time."', 1),
                                                        ('Identify the sentence that uses parallel structure correctly:', 1),
                                                        ('Which of these is an example of a malapropism?', 1),
                                                        ('Select the sentence that correctly uses a split infinitive:', 1),
                                                        ('Identify the sentence that uses synecdoche:', 1);

-- Insert 80 Options (4 for each question)
INSERT INTO quiz_question_options (option_text, is_correct, quiz_question_id) VALUES
-- Question 1: What is the correct spelling?
('Accomodate', 0, 1),
('Accommodate', 1, 1),
('Acommodate', 0, 1),
('Acomodate', 0, 1),

-- Question 2: Choose the correct plural form:
('Childs', 0, 2),
('Childen', 0, 2),
('Children', 1, 2),
('Childres', 0, 2),

-- Question 3: Which word is a verb?
('Happy', 0, 3),
('Table', 0, 3),
('Run', 1, 3),
('Blue', 0, 3),

-- Question 4: Select the correct pronoun: "_____ are going to the park."
('Us', 0, 4),
('Them', 0, 4),
('We', 1, 4),
('They', 0, 4),

-- Question 5: Which sentence is grammatically correct?
('The cat chased it''s tail.', 0, 5),
('The cat chased its tail.', 1, 5),
('The cat chased it''s tale.', 0, 5),
('The cat chased its tale.', 0, 5),

-- Question 6: What is the past tense of "eat"?
('Eated', 0, 6),
('Ate', 1, 6),
('Eaten', 0, 6),
('Eating', 0, 6),

-- Question 7: Choose the correct homophone: "I ___ my lunch."
('ate', 1, 7),
('eight', 0, 7),
('at', 0, 7),
('ait', 0, 7),

-- Question 8: Which word is an adjective?
('Quickly', 0, 8),
('Run', 0, 8),
('Beautiful', 1, 8),
('House', 0, 8),

-- Question 9: Select the correct possessive form:
('The dogs bone', 0, 9),
('The dog''s bone', 1, 9),
('The dogs'' bone', 0, 9),
('The dog''s'' bone', 0, 9),

-- Question 10: What is the opposite of "hot"?
('Warm', 0, 10),
('Cool', 0, 10),
('Cold', 1, 10),
('Freezing', 0, 10),

-- Question 11: Identify the correct use of a semicolon:
('I love cooking; and eating.', 0, 11),
('I love cooking; I also enjoy eating.', 1, 11),
('I love cooking, I also enjoy eating.', 0, 11),
('I love cooking I also enjoy eating.', 0, 11),

-- Question 12: Choose the correct synonym for "benevolent":
('Cruel', 0, 12),
('Indifferent', 0, 12),
('Kind', 1, 12),
('Selfish', 0, 12),

-- Question 13: What is the correct form of the verb in: "Neither of the options ___ appealing."
('are', 0, 13),
('is', 1, 13),
('were', 0, 13),
('be', 0, 13),

-- Question 14: Identify the sentence with correct subject-verb agreement:
('The group of students are studying for the exam.', 0, 14),
('The group of students is studying for the exam.', 1, 14),
('The students in the group is studying for the exam.', 0, 14),
('The students in the group are studying for the exam.', 0, 14),

-- Question 15: Which sentence demonstrates the correct use of the past perfect tense?
('I had finished my homework before dinner.', 1, 15),
('I have finished my homework before dinner.', 0, 15),
('I finished my homework before dinner.', 0, 15),
('I was finishing my homework before dinner.', 0, 15),

-- Question 16: Choose the appropriate transition word: "_____, the project was completed on time."
('However', 0, 16),
('Therefore', 0, 16),
('Nevertheless', 0, 16),
('Ultimately', 1, 16),

-- Question 17: Identify the sentence that uses parallel structure correctly:
('She likes hiking, swimming, and to ride bikes.', 0, 17),
('She likes hiking, swimming, and riding bikes.', 1, 17),
('She likes to hike, to swim, and rides bikes.', 0, 17),
('She likes to hike, swimming, and to ride bikes.', 0, 17),

-- Question 18: Which of these is an example of a malapropism?
('He''s as strong as an ox.', 0, 18),
('She''s a real diamond in the rough.', 0, 18),
('He''s a vast suppository of information.', 1, 18),
('It''s raining cats and dogs.', 0, 18),

-- Question 19: Select the sentence that correctly uses a split infinitive:
('To boldly go where no man has gone before.', 1, 19),
('To go boldly where no man has gone before.', 0, 19),
('Boldly to go where no man has gone before.', 0, 19),
('To go where no man has boldly gone before.', 0, 19),

-- Question 20: Identify the sentence that uses synecdoche:
('The pen is mightier than the sword.', 1, 20),
('He''s the black sheep of the family.', 0, 20),
('The early bird catches the worm.', 0, 20),
('All hands on deck!', 0, 20);