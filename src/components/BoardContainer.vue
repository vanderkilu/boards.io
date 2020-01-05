<template>
    <div class="app-container">
        <div class="app-logo">
            <h1 class="styled">B</h1>
            <h1 class="unstyled">OARDS.IO</h1>
        </div>
        <div  v-show="saveSuccess" class="save-success">
            <p> saved successfully</p>
        </div>
        <div class="row">
            <div class="col-md-4 col-sm-12" v-for="board in boards" :key="board.id">
                <app-board :myBoard="board" :boards="boards"></app-board>
            </div>
        </div>
        <div class="add-button" @click="show = !show">
            <span> &#43; </span>
        </div>
        <div class="save-btn" @click="saveBoards()">
            <span> save </span>
        </div>
        <div class="clear-btn" @click="clearBoards()">
            <span> clear </span>
        </div>
        <div class="pop-up" v-if="show">
            <div class="pop-up-content">
                <span class="close" @click="show = false">&times;</span>
                <form @submit.prevent="addBoard">
                    <input type="text" class="input-custom" v-model="board.name" placeholder="board name">
                    <input type="text" class="input-custom" v-model="board.description" placeholder="board description">
                    <button class="btn btn-custom mt-2"   type="submit">create board</button>
                </form>
            </div>
            
        </div>
    </div>
</template>

<script>
    import Board from './Board.vue'
    import { guid } from '../uuid'
    export default  {
        data() {
            return {
                boards: [
                    {
                        id: 1,
                        name: 'Information',
                        description: '',
                        cards: [
                            {
                                id: 1,
                                board: 1,
                                title: 'you can create boards',
                                description: '',
                                favorite: false,
                                done: false
                            },
                             {
                                id: 2,
                                board: 1,
                                title: 'You can create tasks and dnd them around',
                                description: '',
                                favorite: false,
                                done: false
                            },
                        ]
                    },
                ],
                board: {
                    id: 0,
                    name: '',
                    description: '',
                    cards: []
                },
                show: false,
                saveSuccess: false
            }
        },
        methods: {
            addBoard() {
                if (this.board.name !== '') {
                    let newBoard = JSON.parse(JSON.stringify(this.board))
                    newBoard.id = guid()
                    this.boards.push(newBoard)
                    this.board.name = ''
                    this.show = false
                }
            },
            saveBoards() {
                localStorage.setItem('boards', JSON.stringify(this.boards));
                this.saveSuccess = true;
                setTimeout(()=> {
                    this.saveSuccess = false;
                }, 2000);
            },
            clearBoards() {
                localStorage.clear();
                this.$router.go();
            }
        },
        components: {
            appBoard: Board
        },
        created() {
            let boards = JSON.parse(localStorage.getItem('boards')) || this.boards;
            this.boards = boards;
        },
    }
</script>

<style>
    .card-custom {
        padding: 1rem;
        background-color: white;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.2);
        text-align: center;
        border-radius: 4px;
        margin: 2rem 1rem;
    }
    .btn-custom {
        border-radius: 3px;
        padding: 0.4rem 0.6rem;
        background-color: #b388ff;
        color: white;
    }
    .btn-custom-1 {
        background-color: #e6ee9c;
    }
    .board-name {
        text-transform: capitalize;
    }
    .add-button,.save-btn,.clear-btn{
        width: 4rem;
        height: 4rem;
        padding: 2rem;
        border-radius: 50%;
        background-color: #b388ff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.08);
        top: 10rem;
        right: 2rem;
        color: white;
    }
    .save-btn {
        top: 15rem;
        background-color: white;
        cursor: pointer;
        color: #b388ff;
    }
    .clear-btn {
        top: 20rem;
        background-color: #ffab91;
        cursor: pointer;
        color: white;
    }
    .pop-up{

         position: fixed;
         width: 100%;
         height: 100%;
         background-color: rgba(0,0,0,0.4);
         top: 0;
         left: 0;
         z-index: 10;
         overflow: auto;

    }
    .pop-up-content {
        padding: 5rem;
        background-color: white;
        width: 50vw;
        margin: 10% auto;

    }
    .close {
        color: #4a148c;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
    }
    .add-button:hover {
        cursor: pointer;
    }
    .color-primary {
        color: #4a148c;
    }
    .entry-count {
        margin-bottom: 1rem;
        color: gray;
    }
    .hover {
        background-color: mintcream;
    }
    .save-success {
        background-color: white;
        padding: 0.5rem;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
        color: #00e676;
        width: 20rem;
        margin: 1.5rem auto;
        transition: all 1s;
        text-align: center;
    }
    .app-logo {
        margin-top: 1rem;
        display: flex;
        justify-content: center; 
        align-items: center;
    }
    .styled {
        padding: 1rem 1.5rem;
        background-color: white;
        color: #b388ff;
        font-size: 2.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .unstyled {
        padding-left: 0.2rem;
        text-decoration-line: underline;
        text-decoration-style:double;
        text-decoration-color: #b388ff;
        color: black;
    }
     @media only screen and (max-width: 900px) {
         .pop-up {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
            top: 0;
            left: 0;
            z-index: 10;
            overflow: auto;

        }
        .pop-up-content {
            padding: 2rem;
            width: 80vw;
            margin: 50% auto;
        }
    }
</style>