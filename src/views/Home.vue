<template>
  <div>
    <el-row :style="`padding-bottom: ${currentTrack ? '70px' : '0'}`">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="itemsWrapper">
        <el-row :gutter="15" v-if="(searchResults.length < 1)">
          <track-item-grid
            v-for="(track, i) in tracks"
            :key="i"
            :trackData="track"
            :onClickTrack="handleClickTrack"
            :currentTrack="currentTrack"
          />
        </el-row>
        <el-row :gutter="15" v-if="searchResults.length > 0">
          <track-item-grid
            v-for="(track, i) in searchResults"
            :key="i"
            :trackData="track"
            :onClickTrack="handleClickTrack"
            :currentTrack="currentTrack"
          />
        </el-row>
      </el-col>
      <el-col :xl="24">
        <h1 v-if="getTracksLoading || searchTracksLoading">
          Loading...
        </h1>
      </el-col>
    </el-row>
    <Player
      :tracks="(searchResults.length > 0) ? searchResults : tracks"
      :currentTrack="currentTrack"
      :setCurrentTrack="handleSetCurrentTrack"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TrackItemGrid from '@/components/TrackItemGrid';
import Player from '@/components/Player';

export default {
  data() {
    return {
      page: 1,
      currentTrack: null,
    };
  },
  mounted() {
    this.$store.dispatch('getTracks', {
      genre: 'house',
      page: 1,
    });
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
  components: {
    TrackItemGrid,
    Player,
  },
  computed: {
    ...mapGetters({
      getTracksLoading: 'getTracksLoading',
      tracks: 'tracks',
      activeGenre: 'activeGenre',
      lastPage: 'lastPage',
      searchTracksLoading: 'searchTracksLoading',
      searchResults: 'searchResults',
      searchQuery: 'searchQuery',
      lastSearchPage: 'lastSearchPage',
    }),
  },
  methods: {
    scroll() {
      const page = this.lastPage ? this.lastPage + 1 : this.page += 1;
      const bottomOfWindow =
        (document.documentElement.scrollTop + window.innerHeight) >
        (document.documentElement.offsetHeight - 50);
      if (bottomOfWindow && !this.getTracksLoading) {
        debugger;
        if (this.searchQuery) {
          this.$store.dispatch('search', {
            query: this.searchQuery,
            page: this.lastSearchPage + 1,
          });
        } else {
          this.$store.dispatch('getTracks', {
            genre: this.activeGenre ? this.activeGenre : 'house',
            page,
          });
        }
      }
    },
    handleClickTrack(trackData) {
      if (this.currentTrack && trackData.id === this.currentTrack.id) {
        this.currentTrack = null;
      } else {
        this.currentTrack = trackData;
      }
    },
    handleSetCurrentTrack(currentTrack) {
      this.currentTrack = currentTrack;
    },
  },
};
</script>

<style scoped>
  .itemsWrapper {
    margin: 0 auto;
    float: none;
  }
</style>
