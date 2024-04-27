<script setup>
import {ref} from "vue";
import Header from "@/components/Header.vue";

const popularPizzas = ref([
  { id: 1, name: 'Маргарита', description: 'Традиционная пицца с томатами и сыром', price: '12$' },
  { id: 2, name: 'Пепперони', description: 'Пицца с пепперони и сыром', price: '14$' },
  { id: 3, name: 'Пять сыров', description: 'Пицца с пятью сырами(ого)', price: '15$' },
  { id: 4, name: 'Сырная пицца', description: 'Пицца с сыром. Идеальный выбор для веганов', price: '9$' },
  { id: 5, name: 'Вегетарианская пицца', description: 'Пицца без мяса, а исключительно со свежими овощами из самого сада Афродиты' +
        'Если вам прошлые пиццы показались жирными, то эта для вас будет как молочко в деревне', price: '8$' },
  { id: 6, name: 'Буффало', description: 'Пицца с курицей и соусом буффало', price: '19$' },
]);
</script>

<template>
  <div id="pizza-block" class="popular-pizzas">
    <h2>Популярные пиццы</h2>
    <div class="pizza-list">
      <div class="pizza-item" v-for="pizza in popularPizzas" :key="pizza.id">
        <h3>{{ pizza.name }}</h3>
        <p>{{ pizza.description }}</p>
        <span>{{ pizza.price }}</span>
      </div>
    </div>
  </div>

</template>

<style scoped>
.pizza-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.pizza-item {
  padding: 1rem;
  border-radius: 10px;
  max-width: 300px;
  text-align: center;
}
.pizza-list p {
  font-size: 0.9rem;
}
.pizza-list h3{
  font-size: 1.2rem;
}
.popular-pizzas {
  text-align: center;
  padding-bottom: 20px;
}
.pizza-item span {
  font-size: 1rem;
  font-weight: bold;
}
</style>