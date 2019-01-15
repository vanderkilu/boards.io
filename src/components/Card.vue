
<template>
    <div>
        <div 
        class="card-small" :class="{favorited:currentCard.favorite, done:currentCard.done}"
        draggable="true"
        @dragstart="dragStart($event, card)"
        @dragover.prevent="dragOver($event, card)"
        @dragend="removeCard()"
        @click="editCard(card)"
        >
            {{card.title}}
        </div>
        <div class="pop-up" v-if="show">
            <div class="pop-up-content">
                <span class="close" @click="show = false ">&times;</span>
                <form>
                    <input type="text" class="input-custom" v-model="currentCard.title" placeholder="card name">
                    <input type="text" class="input-custom" v-model="currentCard.description" placeholder="card description">
                    <p class="favorite" @click="makeFavorite()"> Mark as favorite / unfavorite   <i class="hearts" :class="{red:currentCard.favorite}"> &hearts; </i></p>
                    <p class="delete" @click="deleteCard()"> Delete this card</p>
                    <p class="mark-done" @click="makeDone()"> mark card as done / undone  </p>
                </form>
            </div>
        </div>    
    </div>
</template>

<script>
import {eventBus} from '../main.js'
export default {
    props: ['card', 'myBoard'],
    data() {
        return {
              currentCard: {
                  favorite: false,
                  done:false
              },
              show:false,
        }
    },
    methods:  {
            dragStart(ev, card) {
                ev.dropEffect = "move";
                eventBus.$emit('drop-listener', card);
            },
            dragOver(ev, card) {
                ev.dataTransfer.dropEffect = "move"
            },
            _delete() {
                let cardToDelete = this.myBoard.cards.find((c) => c.id === this.card.id)
                let index = this.myBoard.cards.indexOf(cardToDelete);
                this.myBoard.cards.splice(index,1);
            },
            removeCard() {
                this._delete();
            },
            editCard(card) {
                this.currentCard = card;
                this.show = true;
            },
            makeFavorite() {
                this.currentCard.favorite = !this.currentCard.favorite;
            },
            makeDone() {
                this.currentCard.done = !this.currentCard.done;
            },
            deleteCard()  {
                this._delete();
            }
    },
}
</script>

<style>
.delete {
    color: red;
    text-align: left;
    cursor: pointer;
}
.done {
    text-decoration-line: line-through;
    font-style: italic;
    color: gray;
}
.mark-done {
    text-align: left;
    cursor: pointer;
    color: #b388ff;
}
</style>
