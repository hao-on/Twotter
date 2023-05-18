<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div v-if="isAuthLoading">
        <LoadingPage />
      </div>
      <!-- App -->
      <div v-else-if="user" clas="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft
                :user="user"
                @on-tweet="handleOpenTweetModal"
                @on-logOut="handleUserLogOut"
              />
            </div>
          </div>

          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6 max-h">
            <router-view />
          </main>

          <!-- Right Sidebar -->
          <div class="hidden md:block xl:col-span-4 md:col-span-4">
            <div class="sticky top-0">
              <SidebarRight :mode="mode" />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />
      <UIModal :isOpen="postTweetModal" @on-close="handleCloseTweetModal">
        <TweetForm
          :replyTo="replyTweet"
          :user="user"
          showReply
          @on-success="handleFormSuccess"
        />
      </UIModal>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
const darkMode = ref(false)
const mode = ref('Dark')

const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const isAuthLoading = useAuthLoading()
const {
  closePostTweetModal,
  openPostTweetModal,
  usePostTweetModal,
  useReplyTweet,
} = useTweets()
const user = useAuthUser()

const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})

emitter.$on('toggleDarkMode', () => {
  darkMode.value = !darkMode.value
  mode.value = darkMode.value ? 'Light' : 'Dark'
})

function handleFormSuccess(tweet) {
  closePostTweetModal()
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

function handleCloseTweetModal() {
  closePostTweetModal()
}

function handleOpenTweetModal() {
  openPostTweetModal(null)
}

function handleUserLogOut() {
  logout()
}

onBeforeMount(() => {
  initAuth()
})
</script>
