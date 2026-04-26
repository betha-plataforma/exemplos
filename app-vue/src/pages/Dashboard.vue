<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Dashboard" />

  <div class="row">
    <div v-for="(card, index) in SUMMARY_CARDS" :key="`summary-${index}`" class="col-12 col-lg-3">
      <div class="card card-body text-center mb-2">
        <p :class="card.textClass">{{ card.value }}</p>
        <p class="m-0">{{ card.title }}</p>
      </div>
    </div>
  </div>

  <div class="row">
    <div v-for="(card, index) in SIDE_ICON_CARDS" :key="`side-${index}`" class="col-12 col-lg-3">
      <div class="card card-body mb-2">
        <div class="row m-0 align-items-center">
          <div class="col-auto">
            <i :class="card.iconClass" aria-hidden="true"></i>
          </div>
          <div class="col">
            <p :class="card.textClass">{{ card.value }}</p>
            <p class="m-0">{{ card.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div v-for="(card, index) in TOP_ICON_CARDS" :key="`top-${index}`" class="col-12 col-lg-3">
      <div class="card card-body text-center">
        <div class="row m-0 align-items-center">
          <div class="col-12">
            <i :class="card.iconClass" aria-hidden="true"></i>
          </div>
          <div class="col-12">
            <p :class="card.textClass">{{ card.value }}</p>
            <p class="m-0">{{ card.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { SUMMARY_CARDS, SIDE_ICON_CARDS, TOP_ICON_CARDS } from '@/data/examples'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>
