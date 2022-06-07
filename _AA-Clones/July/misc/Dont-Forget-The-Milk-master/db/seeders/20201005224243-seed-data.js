'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: 'Tester',
          lastName: 'One',
          email: 'testerone@test.com',
          userName: 'tester01',
          hashedPassword: bcrypt.hashSync('password123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Tester',
          lastName: 'Two',
          email: 'testertwo@test.com',
          userName: 'tester02',
          hashedPassword: bcrypt.hashSync('password123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Tester',
          lastName: 'Three',
          email: 'testerthree@test.com',
          userName: 'tester03',
          hashedPassword: bcrypt.hashSync('password123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Visitor',
          lastName: 'Demo',
          email: 'demo@dftm.com',
          userName: 'Demo',
          hashedPassword: bcrypt.hashSync('demo123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {returning: true}
    );

    const lists = await queryInterface.bulkInsert(
      "Lists",
      [
        {
          listName: 'Personal',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Work',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Shopping',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Personal',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Work',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Groceries',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Personal',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Work',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Exercise',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          listName: 'Chores',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    return await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          taskName: 'Pick up kid from school',
          description: null,
          isComplete: false,
          dueDate: new Date('2020','10','10'),
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Walk the dog',
          description: null,
          isComplete: true,
          dueDate: new Date('2020','09','23'),
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Drink Coffee',
          description: 'With milk',
          isComplete: true,
          dueDate: new Date('2020','10','01'),
          listId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Find my stapler',
          description: null,
          isComplete: false,
          dueDate: null,
          listId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Buy new monitor',
          description: 'For gaming rig, I\'m rich!',
          isComplete: false,
          dueDate: new Date('2020','10','23'),
          listId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Graduate App Academy!',
          description: 'Hello programmers! Now I\'m really rich!',
          isComplete: false,
          dueDate: new Date('2020','12','31'),
          listId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Milk',
          description: 'Don\'t forget the milk!',
          isComplete: true,
          dueDate: null,
          listId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Buy food',
          description: null,
          isComplete: false,
          dueDate: new Date('2020','09','10'),
          listId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Lift weights',
          description: 'Do you even lift?',
          isComplete: true,
          dueDate: null,
          listId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Run',
          description: 'Run fast',
          isComplete: false,
          dueDate: new Date('2020','10','31'),
          listId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Take out the trash',
          description: null,
          isComplete: false,
          dueDate: new Date('2020','04','16'),
          listId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskName: 'Do laundry',
          description: 'out of underwear...',
          isComplete: false,
          dueDate: null,
          listId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Lists', null, {});
    return queryInterface.bulkDelete('Users', null, {});
  }
};
