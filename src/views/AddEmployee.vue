<script setup lang="ts"></script>

<template>
  <div>
    <v-stepper alt-labels editable :items="['Step 1', 'Step 2', 'Step 3']">
      <template v-slot:item.1>
        <v-card title="Step One" flat>...</v-card>
      </template>

      <template v-slot:item.2>
        <v-card title="Step Two" flat>...</v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Step Three" flat>...</v-card>
      </template>
    </v-stepper>
  </div>
</template>

<style>
.v-stepper-header,
.v-stepper.v-sheet {
  box-shadow: none;
}
</style>
