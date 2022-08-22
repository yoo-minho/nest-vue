<template>
  <div v-for="i in 6" :key="i">
    <q-card class="q-mb-md">
      <q-card-section class="q-pa-none">
        <q-item>
          <q-item-section>
            <q-list>
              <q-item class="q-pa-none" style="min-height: 0">
                <q-skeleton type="text" width="60%" height="2rem" />
              </q-item>
              <q-item class="q-pa-none" style="min-height: 0">
                <q-skeleton type="text" width="80%" height="1.5rem" />
              </q-item>
            </q-list>
          </q-item-section>
        </q-item>
        <q-item style="height: 66px; padding-top: 0">
          <q-item-section>
            <q-item-label>
              <div class="row items-center">
                <div v-for="n in 4" :key="n" class="col-3">
                  <q-skeleton size="50px" />
                </div>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>
