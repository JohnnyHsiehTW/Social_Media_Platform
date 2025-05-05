import supabase from './supabaseClient'

// 取得特定使用者資料
export async function apiGetUsers() {
  try {
    let { data: users, error } = await supabase.from('users').select('*')
    if (error) throw error
    return users
  } catch (error) {
    console.log('讀取使用者資料錯誤')
  }
}

// 取得特定使用者資料
export async function apiGetUser({ userId }) {
  try {
    let { data: users, error } = await supabase.from('users').select('*').eq('id', userId)
    if (error) throw error
    return users
  } catch (error) {
    console.log('讀取使用者資料錯誤')
  }
}

// 新增使用者資料 (新增資料至 users 資料表)

// 更新使用者資料
export async function apiUpdateUser(updateData, userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        username: updateData?.username,
        name: updateData?.name,
        phone: updateData?.phone,
        address: updateData?.address,
      })
      .eq('id', userId)
      .select()
    if (error) throw error
    return data
  } catch (error) {
    console.log(error)
  }
}

// 更新使用者頭貼
export async function apiUpdateUserImage(publicUrl, userId) {
  console.log('apiUpdateUserImage', publicUrl)

  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        img_url: publicUrl,
      })
      .eq('id', userId)
      .select()
    if (error) throw error
    return data
  } catch (error) {
    alert(error)
  }
}
