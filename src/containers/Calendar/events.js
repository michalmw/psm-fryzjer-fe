const now = new Date()

export default [
    // {
    //     id: 0,
    //     title: 'Koloryzacja',
    //     client: 'Magda',
    //     start: new Date(2020, 4, 18, 11, 0, 0),
    //     end: new Date(2020, 4, 18, 13, 0, 0),
    //     resourceId: 1
    // },
    // {
    //     id: 1,
    //     title: 'Strzyżenie',
    //     client: 'Natalia',
    //     start: new Date(2020, 4, 18, 15),
    //     end: new Date(2020, 4, 18, 16),
    //     resourceId: 2
    // },
    //
    // {
    //     id: 2,
    //     title: 'Koloryzacja + strzyżenie',
    //     client: 'Ania',
    //     start: new Date(2020, 4, 18, 9),
    //     end: new Date(2020, 4, 18, 13),
    //     resourceId: 3
    // },
    //
    // {
    //     id: 3,
    //     title: 'Koloryzacja + strzyżenie',
    //     client: 'Justyna',
    //     start: new Date(2020, 4, 19, 9),
    //     end: new Date(2020, 4, 19, 13),
    //     resourceId: 1
    // },
    //
    // {
    //     id: 4,
    //     title: 'Koloryzacja + strzyżenie',
    //     client: 'Justyna',
    //     start: new Date(2020, 4, 19, 10),
    //     end: new Date(2020, 4, 19, 13),
    //     resourceId: 2
    // },
    // {
    //     id: 5,
    //     title: 'Ploteczki',
    //     client: 'Sabina, Paulina',
    //     start: new Date(2020, 4, 19, 11),
    //     end: new Date(2020, 4, 19, 12),
    //     resourceId: 2
    // },
    // {
    //     id: 6,
    //     title: 'Meeting',
    //     start: new Date(),
    //     end: new Date(),
    //     desc: 'Pre-meeting meeting, to prepare for the meeting',
    // },
    {
        id: 7,
        title: 'Lunch',
        start: new Date(2020, 4, 18, 12, 0, 0, 0),
        end: new Date(2020, 4, 18, 13, 0, 0, 0),
        desc: 'Power lunch',
        resourceId: 1
    },
    {
        id: 8,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
    },
    {
        id: 10,
        title: 'Dinner',
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: 'Birthday Party',
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
        id: 12.5,
        title: 'Late Same Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2015, 3, 20, 19, 30, 0),
        end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: 'Point in Time Event',
        start: now,
        end: now,
    },
    {
        id: 16,
        title: 'Video Record',
        start: new Date(2015, 3, 14, 15, 30, 0),
        end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
        id: 17,
        title: 'Dutch Song Producing',
        start: new Date(2015, 3, 14, 16, 30, 0),
        end: new Date(2015, 3, 14, 20, 0, 0),
    },
    {
        id: 18,
        title: 'Itaewon Halloween Meeting',
        start: new Date(2015, 3, 14, 16, 30, 0),
        end: new Date(2015, 3, 14, 17, 30, 0),
    },
    {
        id: 19,
        title: 'Online Coding Test',
        start: new Date(2015, 3, 14, 17, 30, 0),
        end: new Date(2015, 3, 14, 20, 30, 0),
    },
    {
        id: 20,
        title: 'An overlapped Event',
        start: new Date(2015, 3, 14, 17, 0, 0),
        end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
        id: 21,
        title: 'Phone Interview',
        start: new Date(2015, 3, 14, 17, 0, 0),
        end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
        id: 22,
        title: 'Cooking Class',
        start: new Date(2015, 3, 14, 17, 30, 0),
        end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
        id: 23,
        title: 'Go to the gym',
        start: new Date(2015, 3, 14, 18, 30, 0),
        end: new Date(2015, 3, 14, 20, 0, 0),
    },
];
