const {sequelize} = require('./connection');
const {User, Board, Cheese} = require('./index');

describe("User, Board and Cheese models", () => {

    beforeAll( async () => {
      await sequelize.sync({force: true});
    });

    afterEach( async () => {
        await sequelize.sync({force: true});
    });

    test ('if it can create User', async () => {
        const user = await User.create({name:'user1', email: 'user1@email.com'});
        expect(user).toBeDefined();
        expect(user.name).toBe('user1');
        expect(user.email).toBe('user1@email.com');
    });

    test ('if it can create Board', async () => {
        const board = await Board.create({type:'Board1', description: 'Board1 description', rating: 5});
        expect(board).toBeDefined();
        expect(board.type).toBe('Board1');
        expect(board.description).toBe('Board1 description');
        expect(board.rating).toBe(5);
    });

    test ('if it can create Cheese', async () => {
        const cheese = await Cheese.create({title:'Cheese1', description: 'Cheese1 description'});
        expect(cheese).toBeDefined();
        expect(cheese.title).toBe('Cheese1');
        expect(cheese.description).toBe('Cheese1 description');
    });
});