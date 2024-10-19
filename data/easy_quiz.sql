-- Insert the Quiz with ID 5
INSERT INTO quizzes (id, name, participants, difficulty, time_limit) VALUES
    (5, 'Easy English Quiz', 0, 'Easy', 1200);

-- Insert 20 Easy Questions starting from ID 21
INSERT INTO quiz_questions (id, question_text, quiz_id) VALUES
                                                            (21, 'What is the opposite of "big"?', 5),
                                                            (22, 'Choose the correct spelling:', 5),
                                                            (23, 'Which word is a color?', 5),
                                                            (24, 'Select the correct plural: One dog, two ___', 5),
                                                            (25, 'What is the past tense of "walk"?', 5),
                                                            (26, 'Which word means the same as "happy"?', 5),
                                                            (27, 'Choose the correct pronoun: "___ am going to school."', 5),
                                                            (28, 'What is the day after Monday?', 5),
                                                            (29, 'Select the number word: 3', 5),
                                                            (30, 'Which animal says "moo"?', 5),
                                                            (31, 'What is the opposite of "hot"?', 5),
                                                            (32, 'Choose the correct spelling:', 5),
                                                            (33, 'Which word is a fruit?', 5),
                                                            (34, 'Select the correct plural: One child, two ___', 5),
                                                            (35, 'What is the past tense of "eat"?', 5),
                                                            (36, 'Which word means the same as "big"?', 5),
                                                            (37, 'Choose the correct pronoun: "___ is my book."', 5),
                                                            (38, 'What month comes after April?', 5),
                                                            (39, 'Select the number word: 10', 5),
                                                            (40, 'Which animal says "meow"?', 5);

-- Insert all 80 Options (4 for each question) starting from ID 81
INSERT INTO quiz_question_options (id, option_text, is_correct, quiz_question_id) VALUES
-- Question 21: What is the opposite of "big"?
(81, 'Small', 1, 21),
(82, 'Tall', 0, 21),
(83, 'Wide', 0, 21),
(84, 'Heavy', 0, 21),

-- Question 22: Choose the correct spelling:
(85, 'Cat', 1, 22),
(86, 'Kat', 0, 22),
(87, 'Cet', 0, 22),
(88, 'Catt', 0, 22),

-- Question 23: Which word is a color?
(89, 'Blue', 1, 23),
(90, 'Table', 0, 23),
(91, 'Run', 0, 23),
(92, 'Happy', 0, 23),

-- Question 24: Select the correct plural: One dog, two ___
(93, 'Dogs', 1, 24),
(94, 'Dog', 0, 24),
(95, 'Doges', 0, 24),
(96, 'Dogies', 0, 24),

-- Question 25: What is the past tense of "walk"?
(97, 'Walked', 1, 25),
(98, 'Walking', 0, 25),
(99, 'Walks', 0, 25),
(100, 'Walk', 0, 25),

-- Question 26: Which word means the same as "happy"?
(101, 'Glad', 1, 26),
(102, 'Sad', 0, 26),
(103, 'Mad', 0, 26),
(104, 'Bad', 0, 26),

-- Question 27: Choose the correct pronoun: "___ am going to school."
(105, 'I', 1, 27),
(106, 'He', 0, 27),
(107, 'She', 0, 27),
(108, 'They', 0, 27),

-- Question 28: What is the day after Monday?
(109, 'Tuesday', 1, 28),
(110, 'Wednesday', 0, 28),
(111, 'Sunday', 0, 28),
(112, 'Friday', 0, 28),

-- Question 29: Select the number word: 3
(113, 'Three', 1, 29),
(114, 'Four', 0, 29),
(115, 'Five', 0, 29),
(116, 'Six', 0, 29),

-- Question 30: Which animal says "moo"?
(117, 'Cow', 1, 30),
(118, 'Dog', 0, 30),
(119, 'Cat', 0, 30),
(120, 'Bird', 0, 30),

-- Question 31: What is the opposite of "hot"?
(121, 'Cold', 1, 31),
(122, 'Warm', 0, 31),
(123, 'Cool', 0, 31),
(124, 'Wet', 0, 31),

-- Question 32: Choose the correct spelling:
(125, 'Book', 1, 32),
(126, 'Bok', 0, 32),
(127, 'Boock', 0, 32),
(128, 'Buk', 0, 32),

-- Question 33: Which word is a fruit?
(129, 'Apple', 1, 33),
(130, 'Carrot', 0, 33),
(131, 'Potato', 0, 33),
(132, 'Onion', 0, 33),

-- Question 34: Select the correct plural: One child, two ___
(133, 'Children', 1, 34),
(134, 'Childs', 0, 34),
(135, 'Childen', 0, 34),
(136, 'Child', 0, 34),

-- Question 35: What is the past tense of "eat"?
(137, 'Ate', 1, 35),
(138, 'Eaten', 0, 35),
(139, 'Eated', 0, 35),
(140, 'Eating', 0, 35),

-- Question 36: Which word means the same as "big"?
(141, 'Large', 1, 36),
(142, 'Small', 0, 36),
(143, 'Tiny', 0, 36),
(144, 'Little', 0, 36),

-- Question 37: Choose the correct pronoun: "___ is my book."
(145, 'This', 1, 37),
(146, 'These', 0, 37),
(147, 'Those', 0, 37),
(148, 'Them', 0, 37),

-- Question 38: What month comes after April?
(149, 'May', 1, 38),
(150, 'June', 0, 38),
(151, 'March', 0, 38),
(152, 'July', 0, 38),

-- Question 39: Select the number word: 10
(153, 'Ten', 1, 39),
(154, 'Nine', 0, 39),
(155, 'Eleven', 0, 39),
(156, 'Eight', 0, 39),

-- Question 40: Which animal says "meow"?
(157, 'Cat', 1, 40),
(158, 'Dog', 0, 40),
(159, 'Cow', 0, 40),
(160, 'Duck', 0, 40);