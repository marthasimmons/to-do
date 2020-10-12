class Task {
    constructor (text) {
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join("")
        this.text = text
        this.doing = "Not doing"
    }
}

const state = {
    tasks: []
}

const view = (state) => `
    <section>
        <h1>Tasks:</h1>
        <section>
            ${state.tasks.map(task => `<section class="task">
                                            <label>${task.text}</label> 
                                            <button onclick="app.run('doing', ${task.id} )" >${task.doing}</button> 
                                            <button onclick="app.run('delete', ${task.id} )" >Done</button> 
                                            <br>
                                        </section>`).join("")}
        </section>
    </section>
    <section>
        <form onsubmit="app.run('add', this);return false;">
            <input name="text" placeholder="Add task" />
            <button>Add</button>
        </form>
    </section>
`
const update = {
    add: (state, form) => {
        console.log(state)
        const data = new FormData(form)
        const task = new Task(data.get('text'))

        state.tasks.push(task)
        return state
    },

    delete: (state, id) => {
        var index = 0
        var count = 0

        console.log(id)

        state.tasks.forEach(task => {
            console.log(task.id)
            if (id == task.id) {
                index = count
            }
            count = count + 1
        })
        
        console.log(index)

        state.tasks.splice(index,1)

        return state
    },

    doing: (state, id) => {
        var index = 0
        var count = 0

        console.log(id)

        state.tasks.forEach(task => {
            console.log(task.id)
            if (id == task.id) {
                index = count
            }
            count = count + 1
        })

        if (state.tasks[index].doing === "Not doing") {
            state.tasks[index].doing = "Doing"
        }
        else {
            state.tasks[index].doing = "Not doing"
        }

        return state 
    }

}

app.start('app', state, view, update)