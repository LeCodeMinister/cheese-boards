const {sequelize} = require('./connection');
const {User, Board, Cheese} = require('./index');

describe("User, Board and Cheese models", () => {

    beforeEach( async () => {
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

    test('if a User can have many Boards', async () => {
        
        let user1 = await User.create({name:'user1', email: 'user1@email.com'});
        let board1 = await Board.create({type:'Board1', description: 'Board1 description', rating: 5});
        let board2 = await Board.create({type:'Board2', description: 'Board2 description', rating: 1});

        await user1.addBoard(board1);
        await user1.addBoard(board2);

        const user1boards = await user1.getBoards();
        expect(user1boards.length).toBe(2);
        expect(user1boards[0] instanceof Board).toBeTruthy;
        expect(user1boards[0].rating).toBe(5);
        expect(user1boards[1].rating).toBe(1);
    });

    test('if a Board can have many Cheeses, and if a Cheese can have many Boards', async () => {
        
        let board1 = await Board.create({type:'Board1', description: 'Board1 description', rating: 5});
        let board2 = await Board.create({type:'Board2', description: 'Board2 description', rating: 1});
        let cheese1 = await Cheese.create({title: "Cheese1", description: "Cheese1 description"});
        let cheese2 = await Cheese.create({title: "Cheese2", description: "Cheese2 description"});
        
        await board1.addCheeses([cheese1, cheese2]);
        
        const board1cheeses = await board1.getCheeses();
        expect(board1cheeses.length).toBe(2);
    
        await board2.addCheese(cheese1);
        const boardsCheese1 = await cheese1.getBoards();
        expect(boardsCheese1.length).toBe(2);
        const boardsCheese2 = await cheese2.getBoards();
        expect(boardsCheese2.length).toBe(1);
    });

    test('Cheeses can be eager-loaded with Boards', async () => {
        
        await User.bulkCreate([
            {name:'user1', email: 'user1@email.com'}, 
            {name:'user2', email: 'user2@email.com'}, 
            {name:'user3', email: 'user3@email.com'}, 
            {name:'user4', email: 'user4@email.com'}, 
            {name:'user5', email: 'user5@email.com'}
        ]);
        await Board.bulkCreate([
            {type:'Board1', description: 'Board1 description', rating: 1}, {type:'Board2', description: 'Board2 description', rating: 2}, {type:'Board3', description: 'Board3 description', rating: 3}, {type:'Board4', description: 'Board4 description', rating: 4}, {type:'Board5', description: 'Board5 description', rating: 5}
        ]);
        await Cheese.bulkCreate([
            {title: 'Cheese1', description: 'Cheese1 description'}, 
            {title: 'Cheese2', description: 'Cheese2 description'}, 
            {title: 'Cheese3', description: 'Cheese3 description'}, 
            {title: 'Cheese4', description: 'Cheese4 description'}, 
            {title: 'Cheese5', description: 'Cheese5 description'}
        ]);
        
        let board1 = await Board.findByPk(1);
        let cheese1 = await Cheese.findByPk(1);
        let cheese2 = await Cheese.findByPk(2);
        let cheese3 = await Cheese.findByPk(3);
        await board1.addCheeses([cheese1, cheese2, cheese3]);
        
        const wholeBoardWithCheeses = await Board.findAll({
          include: [
            { model: Cheese, as: "Cheeses" }
        ]});

        expect(wholeBoardWithCheeses[0].Cheeses.length).toBe(3);
        expect(wholeBoardWithCheeses[0].Cheeses[0].title).toBe("Cheese1");
        expect(wholeBoardWithCheeses[0].Cheeses[2].description).toBe("Cheese3 description");
        expect(wholeBoardWithCheeses[1].Cheeses.length).toBe(0);
    });
});