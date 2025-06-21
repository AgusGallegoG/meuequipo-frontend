import type { ZodType, ZodTypeDef } from 'zod';
import { UtilBase } from './UtilBase';

/**
 * Utilitario que
 *  Inicializa el valor del formulario
 *  Valida los campos del formulario
 *  Controla los errores
 *  resetea el formilario
 */

type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string | null;
};

export function useZodValidation<T extends Record<string, any>>(
  initialData: T,
  schema: ZodType<T, ZodTypeDef, T>
) {
  const form = ref<T>(UtilBase.cloneVueProxy(initialData));
  const errors = ref<NestedErrors<T>>({});
  const submitted = ref(false);
  const isFormValid = computed(() => {
    return schema.safeParse(form.value).success;
  });

  function validate() {
    const result = schema.safeParse(form.value);
    errors.value = {} as NestedErrors<T>;
    if (!result.success) {
      for (const issue of result.error.issues) {
        setNestedError(issue.path, issue.message);
      }
    }
    return result.success;
  }

  function reset() {
    form.value = UtilBase.cloneVueProxy(initialData);
    clearErrors();
    submitted.value = false;
  }

  function clearErrors() {
    errors.value = {} as NestedErrors<T>;
  }

  function setNestedError(path: (string | number)[], message: string) {
    let current: any = errors.value;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      current[key] = current[key] || {};
      current = current[key];
    }
    current[path[path.length - 1]] = message;
  }

  watch(
    form,
    () => {
      if (submitted.value) validate();
    },
    { deep: true }
  );

  return {
    form,
    errors,
    submitted,
    isFormValid,
    validate,
    reset,
  };
}
