<script setup lang="ts">
import type { Publication } from '@/publication/domain/Publication';
import Card from 'primevue/card';
import Galleria from 'primevue/galleria';
import { ref } from 'vue';

interface Props {
  publication: Publication;
}

const props = defineProps<Props>();

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible:
      props.publication.images?.length && props.publication.images.length > 3
        ? 1
        : props.publication.images?.length || 0,
  },
  {
    breakpoint: '1199px',
    numVisible:
      props.publication.images?.length && props.publication.images.length > 3
        ? 1
        : props.publication.images?.length || 0,
  },
  {
    breakpoint: '767px',
    numVisible:
      props.publication.images?.length && props.publication.images.length > 2
        ? 1
        : props.publication.images?.length || 0,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
  },
]);
</script>

<template>
  <Card class="w-100">
    <template #header v-if="props.publication.images && props.publication.images.length > 0">
      <div class="d-flex justify-content-center align-items-middle mt-3">
        <Galleria
          v-if="props.publication.images"
          :value="props.publication.images"
          :responsiveOptions="responsiveOptions"
          circular
          showIndicators
          indicatorsPosition="bottom"
          showIndicatorsOnItem
          autoPlay
          :transitionInterval="10000"
          :showThumbnails="false"
          container-class="galleria-blog-class"
          class="my-3 mx-1 w-50">
          <template #item="slotProps">
            <div class="d-flex justify-content-center align-items-middle my-1">
              <img
                :src="slotProps.item.url"
                :alt="slotProps.item.name"
                class="carousel-image"
                crossorigin="anonymous"
                loading="lazy" />
              <!-- Por defecto as imaxes redimensionanse para ter un ancho máximo de 25-->
            </div>
          </template>
        </Galleria>
      </div>
    </template>
    <template #title>
      <h1 class="m-1 text-center">{{ props.publication.title }}</h1>
    </template>
    <template #subtitle>
      <div class="text-center m-0">
        <small> {{ props.publication.creationDate }} </small>
      </div>
    </template>
    <template #content>
      <div class="mx-2 my-0 scroll-overflow">
        <p text-break v-html="props.publication.body"></p>
      </div>
    </template>
  </Card>
</template>
<style lang="css">
.scroll-overflow {
  max-height: 15rem;
  overflow-y: auto;
  text-align: justify;
}

.galleria-blog-class {
  max-width: 120px;
}

@media (min-width: 576px) {
  .galleria-blog-class {
    max-width: 275px;
  }
}

@media (min-width: 992px) {
  .galleria-blog-class {
    max-width: 350px;
  }
}

@media (min-width: 1200px) {
  .galleria-blog-class {
    max-width: 640px;
  }
}

.carousel-image {
  border-radius: 5px;
  max-height: 160px;
  height: auto;
  aspect-ratio: initial;
  object-fit: cover;
}

@media (min-width: 576px) {
  .carousel-image {
    height: 200px;
    max-height: 200px;
  }
}

@media (min-width: 992px) {
  .carousel-image {
    height: 225px;
    max-height: 225px;
  }
}

@media (min-width: 1200px) {
  .carousel-image {
    height: 250px;
    max-height: 250px;
  }
}
</style>
