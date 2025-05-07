<script setup lang="ts">
import type { Publication } from '@/publication/domain/Publication';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import { ref } from 'vue';

interface Props {
  publication: Publication;
}

const props = defineProps<Props>();
const showModal = ref<Boolean>(false);

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: props.publication.images.length > 3 ? 3 : props.publication.images.length,
    numScroll: 1,
  },
  {
    breakpoint: '1199px',
    numVisible: props.publication.images.length > 3 ? 3 : props.publication.images.length,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: props.publication.images.length > 2 ? 2 : props.publication.images.length,
    numScroll: 1,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
]);

function viewEntirePublication() {
  showModal.value = true;
}
</script>

<template>
  <Card class="w-75">
    <template #header v-if="props.publication.images && props.publication.images.length > 0">
      <Carousel
        :value="props.publication.images"
        :responsiveOptions="responsiveOptions"
        class="pt-3 d-flex justify-content-center align-items-center text-center">
        <template #item="slotProps">
          <div>
            <img
              :src="slotProps.data.imageB64"
              :alt="slotProps.data.imageName"
              class="carousel-image" />
            <!-- Por defecto as imaxes redimensionanse para ter un ancho máximo de 25-->
          </div>
        </template>
      </Carousel>
    </template>
    <template #title>
      <h1 class="m-1 text-center">{{ props.publication.title }}</h1>
    </template>
    <template #subtitle>
      <div class="text-center w-100 m-0">
        <small> {{ props.publication.creationDate }} </small>
      </div>
    </template>
    <template #content>
      <div class="w-100 mx-5 my-0">
        <p>{{ props.publication.body }}</p>
      </div>
    </template>
    <template #footer>
      <div class="w-100 d-flex flex-row-reverse mx--5">
        <Button text raised @click="viewEntirePublication()">Ver máis</Button>
      </div>
    </template>
  </Card>
</template>
<style lang="css">
.carousel-image {
  width: auto;
  max-height: 30vh;
}
</style>
