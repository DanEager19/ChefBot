import { commandFiles } from '../src/commands'
describe('Command Tests', () => {
    for (let command of commandFiles) {
        it(`${command.data.name} should return a slash command object.`, () => {
            expect(command).toHaveProperty('data');
            expect(command).toHaveProperty('execute');
        });
    }
});