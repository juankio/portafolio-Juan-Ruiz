<script setup>
const props = defineProps({
  isLight: { type: Boolean, default: false },
  courses: { type: Array, default: () => [] },
  selectedCourse: { type: Object, default: null }
})

const emit = defineEmits(['select'])

const getCourseListClass = (item) => {
  const active = props.selectedCourse && item.title === props.selectedCourse.title
  if (active) {
    return props.isLight ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300' : 'bg-red-500/25 text-white ring-1 ring-red-300/60'
  }
  return props.isLight ? 'bg-white/70 hover:bg-white text-slate-800' : 'bg-white/5 hover:bg-white/10 text-slate-200'
}

const onSelect = (item) => emit('select', item)
</script>

<template>
  <div
    class="flex h-full flex-col gap-4 rounded-[22px] border border-white/10 p-4 sm:p-5 backdrop-blur-xl"
    :class="isLight ? 'bg-white/90 border-white/60 shadow-emerald-100/60' : 'bg-black/70 shadow-red-500/20'"
  >
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="text-xs uppercase tracking-[0.28em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Resumen</p>
        <p class="text-sm font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">Seleccion del nodo</p>
      </div>
      <span
        class="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
        :class="isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-red-500/25 text-red-100'"
      >
        {{ courses.length }} cursos
      </span>
    </div>

    <div class="flex items-center gap-2 text-[11px]" :class="isLight ? 'text-slate-500' : 'text-slate-300'">
      <span class="h-[3px] w-10 rounded-full" :class="isLight ? 'bg-emerald-300' : 'bg-red-400'" />
      <span class="leading-tight">Toca un nodo de la ruta o escoge aqui</span>
    </div>

    <div class="flex flex-col gap-2 overflow-y-auto pr-1 max-h-[340px]">
      <button
        v-for="item in courses"
        :key="'list-' + item.title"
        class="flex items-center justify-between rounded-xl px-3 py-2 text-left transition"
        :class="getCourseListClass(item)"
        @click="onSelect(item)"
      >
        <span class="text-sm font-semibold leading-tight line-clamp-1">{{ item.title }}</span>
        <span
          class="text-xs rounded-full px-2 py-0.5 font-semibold"
          :class="isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-red-500/20 text-red-100'"
        >
          {{ item.period }}
        </span>
      </button>
    </div>

    <div
      v-if="selectedCourse"
      class="mt-1 flex flex-col gap-2 rounded-xl border border-white/10 p-3"
      :class="isLight ? 'bg-white shadow-emerald-100/60 border-white/70' : 'bg-white/5 shadow-red-500/30'"
    >
      <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
        <span :class="isLight ? 'text-emerald-700' : 'text-red-300'">{{ selectedCourse.period }}</span>
        <span class="text-[11px]" :class="isLight ? 'text-slate-600' : 'text-slate-200'">{{ selectedCourse.place }}</span>
      </div>
      <p class="text-sm font-semibold leading-snug" :class="isLight ? 'text-slate-900' : 'text-white'">{{ selectedCourse.title }}</p>
      <p class="text-xs leading-snug" :class="isLight ? 'text-slate-700' : 'text-slate-300'">{{ selectedCourse.detail }}</p>
    </div>
  </div>
</template>
