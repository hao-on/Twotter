<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <Title>Search / Twitter</Title>
      </Head>

      <TweetListFeed :tweets="searchTweets" />
    </MainSection>
  </div>
</template>

<script setup>
const { getTweets } = useTweets()

const loading = ref(false)
const searchTweets = ref([])
let searchQuery = useRoute().query.q
watch(
  () => useRoute().fullPath,
  () => {
    searchQuery = useRoute().query.q
    getSearchTweets()
  }
)

onBeforeMount(() => {
  getSearchTweets()
})

async function getSearchTweets() {
  loading.value = true
  try {
    const { tweets } = await getTweets({
      query: searchQuery,
    })
    searchTweets.value = tweets
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
