<template>
    <div>
        <div class="card-custom" :class="{hover:hovered}" 
            @drop.prevent="cardDrop" 
            @dragover.prevent="hovered = true"
            @dragleave.prevent="hovered = false">
                <h5 class="m-2 mb-4 color-primary board-name">{{ myBoard.name}} </h5>
                <div class="dropdown-custom">
                    <div class="dropdown-btn" @click="show = !show">
                        <i class="dropdown-icon"></i>
                        <i class="dropdown-icon"></i>
                        <i class="dropdown-icon"></i>
                    </div>
                </div>
                <p class="entry-count text-center"> {{ myBoard.cards.length }} entries </p>
                <draggable  v-model="myBoard.cards" group="people" @start="drag=true" @end="drag=false">
                    <transition-group name="flip-list">
                        <div v-for="card in myBoard.cards" :key="card.id" > 
                            <app-card :card="card" :myBoard="myBoard"></app-card>
                        </div>
                    </transition-group>
                </draggable>
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
    import draggable from 'vuedraggable'
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
                hovered: false,
                show: false,
                drag: null
            }
        },
        components: {
            appCard: Card,
            draggable
        },
        methods: {
            addCard() {
                let board = this.myBoard
                if (this.card.title !== '') {
                    let newCard = JSON.parse(JSON.stringify(this.card))
                    newCard.id = guid()
                    newCard.board = board.id
                    board.cards.push(newCard)
                    this.card.title = ''
                    this.card.description = ''
                }
            },
            cardDrop() {
                this.hovered = false;
            },
            deleteBoard() {
                this.boards.splice(this.boards.indexOf(this.myBoard), 1);
            }
        },
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
.flip-list-move {
  transition: transform 0.5s;
}
</style>