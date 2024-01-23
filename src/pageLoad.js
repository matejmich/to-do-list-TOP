
import tabs from './tabs';
import createTodo from './createTodo';
console.log('pageLoadWorks')

function initializeHomePage() {
    
    tabs();
    createTodo();
}

export default initializeHomePage;