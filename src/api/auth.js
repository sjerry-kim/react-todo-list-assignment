import { supabase } from 'utils/supabase';

export const signUp = async (email, password, displayName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
  }
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, message: error.message, code: error.code };
    }

    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, message: '로그인 중 오류가 발생했습니다.' };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, user: null };
  } catch (err) {
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
};

export const checkAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, session: data.session };
  } catch (err) {
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
};
