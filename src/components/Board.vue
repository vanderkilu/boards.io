<template>
    <div>
        <div class="card-custom" :class="{hover:hovered}" 
                @drop.prevent="cardDrop($event, myBoard)" 
                @dragover.prevent="hovered = true"
                @dragleave="hovered = false">
                <h5 class="m-2 mb-4 color-primary board-name">{{ myBoard.name}} </h5>
                <div class="dropdown-custom">
                    <div class="dropdown-btn" @click="show = !show">
                        <i class="dropdown-icon"></i>
                        <i class="dropdown-icon"></i>
                        <i class="dropdown-icon"></i>
                    </div>
                </div>
                <p class="entry-count text-center"> {{ myBoard.cards.length }} entries </p>
                <div v-for="card in myBoard.cards" :key="card.id" > 
                    <app-card :card="card" :myBoard="myBoard"></app-card>
                </div>
                <input class="input-custom" v-model="card.title" 
                @keypress.enter="addCard()" placeholder="add a new task">  
        </div>
        <div class="pop-up" v-if="show">
            <div class="pop-up-content">
                <span class="close" @click="show = false ">&times;</span>
                <form>
                    <input type="text" class="input-custom" v-model="myBoard.name" placeholder="board name">
                    <input type="text" class="input-custom" v-model="myBoard.description" placeholder="board description">
                    <p class="delete" @click="deleteBoard()"> Delete this board</p>
                </form>
            </div>
        </div>   
    </div>
        
</template>

<script>
    import Card from './Card.vue'
    import {eventBus} from '../main.js'
    import { guid } from '../uuid'
    export default  {
        props: ['myBoard', 'boards'],
        data() {
            return {
                card:  {
                    id: 0,
                    title: '',
                    board: 0,
                    description: '',
                    favorite: false,
                    done: false,
                },
                dragCard: null,
                hovered: false,
                show: false
            }
        },
        components: {
            appCard: Card,
        },
        methods: {
            addCard() {
                let board = this.myBoard
                if (this.card.title !== '') {
                    let newCard = JSON.parse(JSON.stringify(this.card))
                    let id  = board.cards.length + 1
                    newCard.id = id
                    newCard.board = board.id
                    board.cards.push(newCard)
                    this.card.title = ''
                    this.card.description = ''
                }
            },
            cardDrop(ev, b) {
                this.hovered = false;
                let onBoard = this.boards.find((board) => board.id === b.id)
                this.dragCard.id = guid()
                this.dragCard.board = onBoard.id
                onBoard.cards.push(this.dragCard);
            },
            deleteBoard() {
                this.boards.splice(this.boards.indexOf(this.myBoard), 1);
            }
        },
         mounted() {
            eventBus.$on('drop-listener', (card) => {
                this.dragCard = card 
            })
        }
       
    }
</script>

<style>
.card-small {
    padding: 1.5rem;
    background-color: #eeeeee;
    border-radius: 3px;
    margin-bottom: 0.5rem;
    position: relative;
    text-align: left;
}
.card-small:hover {
    cursor: pointer;
}
.card-small::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 100%;
    background-color: #b388ff;
    position: absolute;
    left: 0;
    top: 0;
}
.input-custom {
    padding: 0.5rem 1rem;
    width: 100%;
    border: none;
    border-bottom: 1px solid #b388ff;
    background-color: whitesmoke;
    transition: all 0.3s;
    margin: 2rem auto;
    display: block;
}
.input-custom:focus {
    outline: none;
}
.red {
    color: red;
}
.hearts {
    font-size: 2rem;
    transition:  all 0.5s;
}
.hearts:hover {
    cursor: pointer;
}
.favorite {
    text-align: left;
    color: #eeff41;
    cursor: pointer;
}
.favorited::before {
    background-color: #eeff41;
}
.dropdown-btn {
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
.dropdown-icon {
    display: block;
    width:0.3rem;
    height:0.3rem;
    background-color: #b388ff;
    border-radius: 50%;
    margin: 0.1rem;
}
.dshow {
    display: block;
}
</style>