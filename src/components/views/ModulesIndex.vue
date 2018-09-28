<template>
  <v-container fluid pa-0>
    <v-list two-line>

      <v-subheader>Modules</v-subheader>

      <v-divider></v-divider>

      <template v-for="(item, index) in modules">

        <!-- <v-list-tile
          :key="index"
          avatar
          @click="null"
        > -->

        <v-list-tile
          :key="index"
          @click="null"
        >
          <!-- <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar> -->

          <v-list-tile-content>
            <v-list-tile-title>
              <span class="font-weight-medium">{{item.title}}</span>
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="item.summary"></v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-divider :key="`line` + index"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      modules: [
        {
          title: 'Electromagnetism',
          summary: 'skjdnfcklsab sa,mfndhcsjakdn sdbdnx sdhabdc dsfb csdbundkmncdsnh vjdnf  vkdfnvsd vkvndl fdvkdfn vdvjd dfvkjd fvjklmslkfd;l,v d,a csdvs;d dkm;ld vkjnsdl vsjfkldsmf sdvjksdn sdjasn;ldmfndm sd ljdnl;sd sjdnvfkldsf fvjndf sdfjusdnfklsd f'
        },
        {
          title: 'Electromagnetism',
          summary: 'Dummy dummy'
        },
        {
          title: 'Electromagnetism',
          summary: 'Dummy dummy'
        },
        {
          title: 'Electromagnetism',
          summary: 'Dummy dummy'
        },
        {
          title: 'Electromagnetism',
          summary: 'Dummy dummy'
        },
        {
          title: 'Electromagnetism',
          summary: 'Dummy dummy'
        },
        {
          title: 'Electromagnetism',
          summary: 'Dummy dummy'
        }
      ]
    }
  }
}
</script>
