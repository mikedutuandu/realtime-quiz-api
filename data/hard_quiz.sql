-- Insert the Hard Quiz with ID 7
INSERT INTO quizzes (id, name, participants, difficulty, time_limit) VALUES
    (7, 'Hard English Quiz', 0, 'Hard', 1800);

-- Insert 20 Hard Questions starting from ID 41
INSERT INTO quiz_questions (id, question_text, quiz_id) VALUES
                                                            (41, 'Which of these is an example of a malapropism?', 7),
                                                            (42, 'Identify the correct usage of the subjunctive mood:', 7),
                                                            (43, 'Which sentence demonstrates correct parallel structure?', 7),
                                                            (44, 'What is the term for a word that is spelled the same backwards and forwards?', 7),
                                                            (45, 'Which of these is an example of synecdoche?', 7),
                                                            (46, 'Identify the sentence that uses the correct form of the past perfect progressive tense:', 7),
                                                            (47, 'Which of these words is an example of an oxymoron?', 7),
                                                            (48, 'What literary device is used in the phrase "The pen is mightier than the sword"?', 7),
                                                            (49, 'Which sentence correctly uses a gerund phrase as the subject?', 7),
                                                            (50, 'Identify the correct use of a semicolon:', 7),
                                                            (51, 'Which of these is an example of litotes?', 7),
                                                            (52, 'What is the rhetorical device used in "Ask not what your country can do for you; ask what you can do for your country"?', 7),
                                                            (53, 'Which sentence correctly uses the past perfect subjunctive?', 7),
                                                            (54, 'Identify the sentence that uses polysyndeton:', 7),
                                                            (55, 'What is the term for a word that has the same spelling as another but different meaning and pronunciation?', 7),
                                                            (56, 'Which sentence demonstrates the correct use of a dangling modifier?', 7),
                                                            (57, 'Identify the sentence that uses anaphora:', 7),
                                                            (58, 'Which of these is an example of a spoonerism?', 7),
                                                            (59, 'What is the grammatical term for a verb form ending in -ing?', 7),
                                                            (60, 'Identify the sentence that uses hyperbole:', 7);

-- Insert 80 Options (4 for each question) starting from ID 161
INSERT INTO quiz_question_options (id, option_text, is_correct, quiz_question_id) VALUES
-- Question 41: Which of these is an example of a malapropism?
(161, 'He''s a wolf in sheep''s clothing', 0, 41),
(162, 'She''s as fit as a fiddle', 0, 41),
(163, 'He''s a vast suppository of information', 1, 41),
(164, 'It''s raining cats and dogs', 0, 41),

-- Question 42: Identify the correct usage of the subjunctive mood:
(165, 'I wish I was taller', 0, 42),
(166, 'If I were you, I would accept the offer', 1, 42),
(167, 'I hope that he comes to the party', 0, 42),
(168, 'She acts as if she owns the place', 0, 42),

-- Question 43: Which sentence demonstrates correct parallel structure?
(169, 'He likes hiking, to swim, and riding bicycles', 0, 43),
(170, 'She enjoys reading books, watching movies, and to play games', 0, 43),
(171, 'The professor emphasized taking notes, asking questions, and participating in discussions', 1, 43),
(172, 'We should focus on to eat healthy, exercise regularly, and getting enough sleep', 0, 43),

-- Question 44: What is the term for a word that is spelled the same backwards and forwards?
(173, 'Anagram', 0, 44),
(174, 'Palindrome', 1, 44),
(175, 'Homograph', 0, 44),
(176, 'Acronym', 0, 44),

-- Question 45: Which of these is an example of synecdoche?
(177, 'The pen is mightier than the sword', 1, 45),
(178, 'He''s the black sheep of the family', 0, 45),
(179, 'She''s as cold as ice', 0, 45),
(180, 'Life is but a dream', 0, 45),

-- Question 46: Identify the sentence that uses the correct form of the past perfect progressive tense:
(181, 'I had been studying for three hours before she arrived', 1, 46),
(182, 'I have been studying for three hours before she arrived', 0, 46),
(183, 'I was studying for three hours before she arrived', 0, 46),
(184, 'I had studied for three hours before she arrived', 0, 46),

-- Question 47: Which of these words is an example of an oxymoron?
(185, 'Bittersweet', 1, 47),
(186, 'Enormous', 0, 47),
(187, 'Perplexed', 0, 47),
(188, 'Serendipity', 0, 47),

-- Question 48: What literary device is used in the phrase "The pen is mightier than the sword"?
(189, 'Simile', 0, 48),
(190, 'Metaphor', 1, 48),
(191, 'Alliteration', 0, 48),
(192, 'Personification', 0, 48),

-- Question 49: Which sentence correctly uses a gerund phrase as the subject?
(193, 'To run a marathon requires training', 0, 49),
(194, 'Running a marathon requires training', 1, 49),
(195, 'He runs marathons, which requires training', 0, 49),
(196, 'A marathon runner requires training', 0, 49),

-- Question 50: Identify the correct use of a semicolon:
(197, 'I love cooking; I hate cleaning', 1, 50),
(198, 'I love cooking, I hate cleaning', 0, 50),
(199, 'I love cooking: I hate cleaning', 0, 50),
(200, 'I love cooking; and I hate cleaning', 0, 50),

-- Question 51: Which of these is an example of litotes?
(201, 'He''s as strong as an ox', 0, 51),
(202, 'It''s not the worst idea I''ve ever heard', 1, 51),
(203, 'She''s a genius', 0, 51),
(204, 'They fought like cats and dogs', 0, 51),

-- Question 52: What is the rhetorical device used in "Ask not what your country can do for you; ask what you can do for your country"?
(205, 'Anaphora', 0, 52),
(206, 'Chiasmus', 1, 52),
(207, 'Antithesis', 0, 52),
(208, 'Epiphora', 0, 52),

-- Question 53: Which sentence correctly uses the past perfect subjunctive?
(209, 'If I had known, I would have told you', 1, 53),
(210, 'If I knew, I would have told you', 0, 53),
(211, 'If I had knew, I would have told you', 0, 53),
(212, 'If I would have known, I would have told you', 0, 53),

-- Question 54: Identify the sentence that uses polysyndeton:
(213, 'I came, I saw, I conquered', 0, 54),
(214, 'He ran and jumped and laughed and played', 1, 54),
(215, 'Neither a borrower nor a lender be', 0, 54),
(216, 'To be, or not to be, that is the question', 0, 54),

-- Question 55: What is the term for a word that has the same spelling as another but different meaning and pronunciation?
(217, 'Homonym', 0, 55),
(218, 'Synonym', 0, 55),
(219, 'Antonym', 0, 55),
(220, 'Heteronym', 1, 55),

-- Question 56: Which sentence demonstrates the correct use of a dangling modifier?
(221, 'Having finished the assignment, the TV was turned on', 0, 56),
(222, 'Walking down the street, the trees were beautiful', 0, 56),
(223, 'To improve your writing, essays should be proofread', 0, 56),
(224, 'Having finished the assignment, I turned on the TV', 1, 56),

-- Question 57: Identify the sentence that uses anaphora:
(225, 'I came, I saw, I conquered', 0, 57),
(226, 'With malice toward none, with charity for all', 0, 57),
(227, 'Mad world! Mad kings! Mad composition!', 1, 57),
(228, 'Ask not what your country can do for you; ask what you can do for your country', 0, 57),

-- Question 58: Which of these is an example of a spoonerism?
(229, 'A lack of pies (instead of a pack of lies)', 1, 58),
(230, 'As busy as a bee', 0, 58),
(231, 'The early bird catches the worm', 0, 58),
(232, 'A penny for your thoughts', 0, 58),

-- Question 59: What is the grammatical term for a verb form ending in -ing?
(233, 'Infinitive', 0, 59),
(234, 'Participle', 1, 59),
(235, 'Gerund', 0, 59),
(236, 'Subjunctive', 0, 59),

-- Question 60: Identify the sentence that uses hyperbole:
(237, 'The sun is shining brightly today', 0, 60),
(238, 'I''ve told you a million times not to exaggerate', 1, 60),
(239, 'She''s as tall as her mother', 0, 60),
(240, 'He works from nine to five', 0, 60);