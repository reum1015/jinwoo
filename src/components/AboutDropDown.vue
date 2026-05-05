<template>
  <div class="about_dropDwon column rounded-borders q-col-gutter-y-sm text-left">
    <q-list dense>
      <q-item clickable to="/About" class="q_item">
        <q-item-section side>
          <q-icon name="info_outline" class="q_item_icon" />
        </q-item-section>
        <q-item-section>About</q-item-section>
      </q-item>

      <q-item clickable to="/Vision" class="q_item">
        <q-item-section side>
          <q-icon name="account_tree" class="q_item_icon" />
        </q-item-section>
        <q-item-section>Management&nbsp;&nbsp;Philosophy</q-item-section>
      </q-item>

      <q-item clickable to="/Organization" class="q_item">
        <q-item-section side>
          <q-icon name="people" class="q_item_icon" />
        </q-item-section>
        <q-item-section>Org Chart</q-item-section>
      </q-item>

      <q-item clickable to="/Location" class="q_item">
        <q-item-section side>
          <q-icon name="map" class="q_item_icon" />
        </q-item-section>
        <q-item-section>Location</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.about_dropDwon {
  background: $menuDropDownColorBG;
  font-family: 'Paperozi';
  font-size: 1rem;
  position: absolute;
  top: 110%;
  :last-child {
    padding-bottom: 6px;
  }
}

.q_item_icon {
  color: white;
}

.q-item__section--side {
  padding-right: 7px;
}
:deep(.q_item) {
  &:hover {
    color: $mainColor;
    //text-shadow: 3px 4px 3px rgba(69, 153, 217, 0.61);
  }

  &:hover .q-focus-helper {
    background: transparent !important;
    opacity: 0 !important;
  }
}
</style>
