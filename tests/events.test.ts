import { eventFiles } from '../src/bot/events'
describe('Event Tests', () => {
    for (let event of eventFiles) {
        it(`${event.name} should return a slash event object.`, () => {
            expect(event).toHaveProperty('name');
            expect(event).toHaveProperty('execute');
        });
    }
});