<template>
  <div>
    <TweetItem :tweet="tweet" />
    <TweetForm
      :user="user"
      :reply-to="props.tweet"
      placeholder="Tweet your reply"
      btnTitle="Reply"
      @on-success="handleFormSuccess"
    />

    <TweetListFeed :tweets="replies" />
  </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
})

const replies = computed(() => props.tweet?.replies || [])
function handleFormSuccess(tweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}
</script>
