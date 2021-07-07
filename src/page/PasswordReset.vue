<template>
  <div id="user-form">
    <form @submit.prevent="handleSubmit">
      <!-- add if, error message -->
      <p v-if="error && submitting" class="error-message">
        ❗Please fill out all required fields
      </p>
      <!-- add if, success message -->
      <p v-if="success" class="success-message">
        ✅ お客様のメールアドレスへメールをしました。
      </p>
      <div class="mb-3">
        <label for="exampleInputUserId1" class="form-label">ユーザー名</label>
        <!-- add :class, @focus, @keypress -->
        <input 
          ref="first"
          v-model="user.userId"
          type="text"
          class="form-control"
          id="exampleInputUserId1"
          aria-describedby="userIdHelp"
          :class="{ 'has-error': submitting && invalidUserId }"
          @focus="clearStatus"
          @keypress="clearStatus"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputMailAddress1" class="form-label">メールアドレス</label>
        <!-- add :class, @focus -->
        <input 
          v-model="user.mailAddress"
          type="mailAddress"
          class="form-control"
          id="exampleInputMailAddress1"
          aria-describedby="mailAddressHelp"
          :class="{ 'has-error': submitting && invalidMailAddress }"
          @focus="clearStatus"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputBirthday1" class="form-label">生年月日</label>
        <!-- add :class, @focus -->
        <input 
          v-model="user.birthday"
          type="birthday"
          class="form-control"
          id="exampleInputBirthday1"
          aria-describedby="birthdayHelp"
          :class="{ 'has-error': submitting && invalidBirthday }"
          @focus="clearStatus"
        />
      </div>
      <button
        class="btn btn-primary"
        type="submit">パスワードリセット
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    userId: 'UserForm',
    data() {
      return {
        // add submitting, error, success
        submitting: false,
        error: false,
        success: false,
        user: {
          userId: '',
          mailAddress: '',
          birthday: '',
        },
      }
    },
    // add computed
    computed: {
      // add invalidUserId()
      invalidUserId() {
        return this.user.userId === ''
      },
      // add invalidMailAddress()
      invalidMailAddress() {
        return this.user.mailAddress === ''
      },
            // add invalidMailAddress()
      invalidBirthday() {
        return this.user.birthday === ''
      },
    },
    methods: {
      handleSubmit() {
        console.log('testing handleSubmit')
        // when you click 'Add User' button, you will see 'testing handleSubmit' in console
        
        this.submitting = true
        this.clearStatus()

        if (this.invalidUserId || this.invalidMailAddress || this.invalidBirthday) {
          this.error = true
          return
        }

        this.$emit('add:user', this.user)
        // when you click 'Add User' button, you will see 'add:user' through vue > events
        
        this.$refs.first.focus()
        this.user = {
          userId: '',
          mailAddress: '',
          birthday: '',
        }
        // add submitting, error, success
        this.error = false
        this.success = true
        this.submitting = false
      },
      // add clearStatus()
      clearStatus() {
        // add error, success
        this.success = false
        this.error = false
      },
    },
  }
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }


</style>