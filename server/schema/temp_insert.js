module.exports = async (db) => {
    await db.questions.create({
        question_id: 0,
        question_type: null
    })

    let max = await db.questions.max('question_id')
    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "math"
    })

    await db.math.create({
        question_id: max,
        statement: null,
        question: "454 + 297 = {?}",
        answer: "751",
        question_type: 1
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "math"
    })

    await db.math.create({
        question_id: max,
        statement: null,
        question: "{?} + 17 = 43",
        answer: "26",
        question_type: 2
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "math"
    })

    await db.math.create({
        question_id: max,
        statement: null,
        question: "17 + {?} = 43",
        answer: "26",
        question_type: 3
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "math"
    })

    await db.math.create({
        question_id: max,
        statement: "Look at the numbers:\n9    10    14\n15    17    19\n25    28    30",
        question: "Which two numbers are multiples of 7? {?} {?}\nWhich two numbers are prime? {?} {?}\nWhich two numbers are factors of 50? {?} {?}\nWhich two numbers are square numbers? {?} {?}",
        answer: "[[14, 28],[17, 19],[10, 25],[9, 25]]",
        question_type: 4
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "math"
    })

    await db.math.create({
        question_id: max,
        statement: "Which is the smallest number in each group?",
        question: "0.309 0.039 0.93 0.093\n-7.5 -8 2 0\n1/5 1/6 1/7 1/8\n0.4 30% 0.22 1/4",
        answer: "[0.039, -8, 1/8, 0.22]",
        question_type: 5
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "math"
    })

    await db.math.create({
        question_id: max,
        statement: "Fill in the missing numbers in the sequences below.",
        question: "-3 1 5 9 {?} {?}\n32 26 {?} 14 {?} 2\n3 6 12 {?} 48 {?}\n1 4 {?} 16 25 {?}",
        answer: "[[13, 17], [20, 8], [24, 96], [9, 36]]",
        question_type: 6
    })

    await db.englishStory.create({
        title: "The Crystal Heart",
        story: "Mi Nuong’s father was an influential Lord. He ruled all of the lands of the Red River and his palace\n      stood tall and majestic on its broad, sloping banks. Yet, Mi Nuong was forlorn and melancholy. Her\n      father kept her locked away at the top of the palace’s tallest tower in order to keep her out of harm’s\n      way. Mi Nuong felt trapped; the only company she had was her maid and her daily routine was always\n5    the same. Everyday, she would sit by her window embroidering and look out of her window, gazing\n      sorrowfully down at the waters rushing past far below. Often, she dreamed of being carried away in the\n      fast flowing rapids to distant lands.\n         One morning, Mi Nuong heard music floating through her open window. She hurried over to see\n      where the sound was coming from. There, on the river below, was a little golden fishing boat. Mi Nuong\n10  heard the music rise up from the boat, and caught snatches of a song: “My love is like a blossom in the\n      breeze. My love is like a moonbeam on the waves.”\n         The music was captivating, drawing Mi Nuong like a flickering candle flame draws the unwary moth.\n      The voice was clear and sweet and Mi Nuong leaned out as far out as she could to try to catch sight of\n      the singer. As the boat bobbed past, she glimpsed the tiny figure of a man standing on the prow with a\n15  net. A sudden glimmer of hope lit up in her heart and she felt as if she was floating on air. Perhaps this\n      man had come to release her from the tower. Perhaps he was a Mandarin’s son in disguise; the man she\n      was destined to marry...\n\nAnswer these questions about the text that you’ve just read."
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "english"
    })

    await db.english.create({
        question_id: max,
        story_id: 1,
        question: "Why was Mi Nuong lonely?",
        answer: "The song she heard reminded her of the world outside.",
        incorrect_answer_one: "She was confined to the tower.",
        incorrect_answer_two: "She was tired of her daily routine.",
        incorrect_answer_three: "Her maid wasn’t very good company.",
        incorrect_answer_four: "She wanted to be rescued by her true love."
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "english"
    })

    await db.english.create({
        question_id: max,
        story_id: 1,
        question: "What does Mi Nuong usually do to pass the time in her tower?",
        answer: "She sings.",
        incorrect_answer_one: "She plays cards.",
        incorrect_answer_two: "She dreams of her true love.",
        incorrect_answer_three: "She paints.",
        incorrect_answer_four: "She sews."
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "english"
    })

    await db.english.create({
        question_id: max,
        story_id: 1,
        question: "What is Mi Nuong’s father like?",
        answer: "Cruel",
        incorrect_answer_one: "Proud",
        incorrect_answer_two: "Protective",
        incorrect_answer_three: "Resentful",
        incorrect_answer_four: "Arrogant"
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "english"
    })

    await db.english.create({
        question_id: max,
        story_id: 1,
        question: "Which one of these things isn’t mentioned in the story?",
        answer: "Water",
        incorrect_answer_one: "Fire",
        incorrect_answer_two: "Sunlight",
        incorrect_answer_three: "Moonlight",
        incorrect_answer_four: "Gold"
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "english"
    })

    await db.english.create({
        question_id: max,
        story_id: 1,
        question: "How does the music make Mi Nuong feel?",
        answer: "Forlorn and lonely",
        incorrect_answer_one: "Enthralled and wishful",
        incorrect_answer_two: "Powerful and strong",
        incorrect_answer_three: "Sorrowful and desperate",
        incorrect_answer_four: "Lovesick and anxious"
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "english"
    })

    await db.english.create({
        question_id: max,
        story_id: 1,
        question: "Why was the man on the boat?",
        answer: "He hopes to persuade Mi Nuong to marry him.",
        incorrect_answer_one: "He has come to sing for Mi Nuong’s father.",
        incorrect_answer_two: "He is delivering goods to the palace.",
        incorrect_answer_three: "He is fishing in the river.",
        incorrect_answer_four: "He has come to take Mi Nuong to a distant land."
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "english"
    })

    await db.english.create({
        question_id: max,
        story_id: 1,
        question: "Why does Mi Nuong lean as far out of the window as she can?",
        answer: "She wants to hear more of the song.",
        incorrect_answer_one: "She wants the figure on the fishing boat to see her.",
        incorrect_answer_two: "She wants to see the singer.",
        incorrect_answer_three: "She is fascinated by the music.",
        incorrect_answer_four: "She wants the man on the boat to rescue her."
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "english"
    })

    await db.english.create({
        question_id: max,
        story_id: 1,
        question: "Which of these words best describes how Mi Nuong feels at the end of the passage?",
        answer: "Optimistic",
        incorrect_answer_one: "Relieved",
        incorrect_answer_two: "Infatuated",
        incorrect_answer_three: "Besotted",
        incorrect_answer_four: "Emotional"
    })

    max = max + 1

    await db.questions.create({
        question_id: max,
        question_type: "verbal_reasoning"
    })

    await db.verbalReasoning.create({
        question_id: max,
        question: "ar (?) rain		ran (?) oot\ncar (?) ase 		star (?) we\ncu (?) ane 		har (?) aid\nman (?) our 		parr (?) ear\nban (?) ail       sin (?) row",
        answer: "['t', 'e', 'p', 'y', 'g']"
    })
}

