<template>
  <div>
  <LoadingOverlay />
  <PageHeader title="Timeline" />

  <div class="row">
    <div
      v-for="group in TIMELINE_GROUPS"
      :key="`${group.month}-${group.day}`"
      class="col-12 mb-3"
    >
      <div class="d-flex">
        <ul class="nav nav-tabs nav-timeline flex-column">
          <li>
            <span class="badge">{{ group.month }}</span>
          </li>
          <li>
            <div>
              <p>{{ group.day }}</p>
            </div>
          </li>
          <li
            v-for="event in group.events"
            :key="`${group.month}-${event.time}-${event.description}`"
          >
            <div>
              <small>{{ event.time }}</small>
            </div>
            <p>
              <template v-if="event.hasHistoryLink">
                <button type="button" class="btn btn-link p-0 align-baseline">
                  Link para o histórico
                </button>
                <br />
              </template>
              {{ event.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { TIMELINE_GROUPS } from '@/data/examples'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>
