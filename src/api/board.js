import { supabase } from 'utils/supabase';
import { checkSession } from './auth';

export const getBoard = async (user, ascending, search) => {
  try {
    const result = await checkSession();

    if (!result.session) {
      throw { message: result.message, status: 401 };
    }

    const { data, status, error } = await supabase
      .from('todos')
      .select()
      .eq('user_id', user.id)
      .like('text', `%${search}%`)
      .order('created_at', { ascending: ascending });

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return {
      status: status,
      data: data.length ? data.map((item, index) => ({ ...item, rn: ascending ? index + 1 : data.length - index })) : [],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postBoard = async (user, text) => {
  try {
    const result = await checkSession();

    if (!result.session) {
      throw { message: result.message, status: 401 };
    }

    const { status, error } = await supabase.from('todos').insert({ user_id: user.id, text: text });

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return { status: status };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchBoard = async (user, idx, text) => {
  try {
    const result = await checkSession();

    if (!result.session) {
      throw { message: result.message, status: 401 };
    }

    const { data, status, error } = await supabase.from('todos').update({ text: text }).eq('idx', idx).select();

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return { status: status, data: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBoard = async (selectedList) => {
  try {
    const result = await checkSession();

    if (!result.session) {
      throw { message: result.message, status: 401 };
    }

    const { status, error } = await supabase.from('todos').delete().in('idx', selectedList);

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return { status: status };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
