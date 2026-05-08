"use client";

import React, { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type Mechanic = {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  image: string;
  caption: string;
  tags: string[];
};

type TimelineItem = {
  phase: string;
  title: string;
  text: string;
  image: string;
};

type GalleryItem = {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
};

const ASSETS = {
  heroOldStreet: "/sanyue-assets/hero-old-street.jpg",
  heroUmbrella: "/sanyue-assets/hero-umbrella-rain.jpg",
  maskMechanic: "/sanyue-assets/mask-mechanic.png",
  maskDesignBoard: "/sanyue-assets/mask-design-board.jpg",
  roomInterior: "/sanyue-assets/room-interior.png",
  roomEditor: "/sanyue-assets/room-editor-view.png",
  tapeScreen: "/sanyue-assets/tape-screen.png",
  memoryLog: "/sanyue-assets/memory-log.png",
  hospital: "/sanyue-assets/hospital-scene.png",
  oldBuilding: "/sanyue-assets/old-building-illustration.png",
  rpgPlayable: "/sanyue-assets/rpg-playable.png",
  rpgMap: "/sanyue-assets/rpg-map.png",
  rpgNotes: "/sanyue-assets/rpg-layout-notes.png",
  characterConcepts: "/sanyue-assets/character-concepts.jpg",
  spriteSheet: "/sanyue-assets/sprite-sheet.png",
  levelMap: "/sanyue-assets/level-map.png",
  uiReturn: "/sanyue-assets/ui-return-screen.jpg",
  dialogueScene: "/sanyue-assets/dialogue-scene.jpg",
  puzzleLock: "/sanyue-assets/puzzle-lock.jpg",
  rainEntrance: "/sanyue-assets/rain-entrance.jpg",
  memoryText: "/sanyue-assets/memory-text.jpg",
  pickupNote: "/sanyue-assets/pickup-note.jpg",
  tapeCloseup: "/sanyue-assets/tape-closeup.jpg",
  oldRoomDiary: "/sanyue-assets/old-room-diary.jpg",
};

const mechanics: Mechanic[] = [
  {
    id: "umbrella",
    title: "雨伞双世界遮罩",
    subtitle: "Umbrella Mask Puzzle",
    text:
      "玩家撑开雨伞后，伞下显露另一层地图。伞外是现实路径，伞内是被记忆遮住的机关提示。解谜的核心不是找到答案，而是学会从两个世界同时看同一个地方。",
    image: ASSETS.maskMechanic,
    caption: "Unity 原型与实际游戏效果并置，适合作为核心创新机制展示图。",
    tags: ["双世界", "遮罩系统", "空间对应", "核心创新"],
  },
  {
    id: "memory",
    title: "记忆碎片与旧物叙事",
    subtitle: "Memory Fragments",
    text:
      "磁带、日记、照片、纸条和糖葫芦材料并不是普通收集品。它们承担了剧情推进、情绪回收和人物关系补全的功能，让玩家在拾取中慢慢理解江一安与爷爷的关系。",
    image: ASSETS.oldRoomDiary,
    caption: "老屋中的日记与文本界面，强化“读到过去”的沉浸感。",
    tags: ["记忆碎片", "背包系统", "物品线索", "亲情回望"],
  },
  {
    id: "rpg",
    title: "支线 RPG 像素玩法",
    subtitle: "Pixel Side Quest",
    text:
      "主线是手绘横版探索，支线则切入俯视角像素 RPG。玩家在小地图中寻找山楂、白糖、竹签等材料，完成糖葫芦制作任务，让玩法从压抑转向一段轻盈的童年回忆。",
    image: ASSETS.rpgMap,
    caption: "支线地图保留了小镇、河道、店铺和材料收集点。",
    tags: ["像素支线", "任务链", "材料收集", "糖葫芦"],
  },
  {
    id: "layers",
    title: "现实 / 记忆 / 梦境",
    subtitle: "Three Narrative Spaces",
    text:
      "游戏在旧居民楼、老屋、学校、病房和雨夜入口之间转换。每个空间都不只是场景，而是主角情绪的一个切面：迷茫、恐惧、想起、愧疚，直到释怀。",
    image: ASSETS.oldBuilding,
    caption: "倾斜的旧居民楼画面非常适合作为梦境空间的视觉锚点。",
    tags: ["三层叙事", "清明", "梦境感", "情绪空间"],
  },
];

const timeline: TimelineItem[] = [
  {
    phase: "01",
    title: "立项与主题确认",
    text: "从中国传统节日命题出发，选择清明节作为核心主题，并将方向确定为中式情感解谜。",
    image: ASSETS.heroOldStreet,
  },
  {
    phase: "02",
    title: "故事与场景原型",
    text: "围绕江一安、爷爷江福海、旧居民楼、糖葫芦摊和墓园，搭建现实与记忆交错的叙事骨架。",
    image: ASSETS.roomInterior,
  },
  {
    phase: "03",
    title: "支线玩法迭代",
    text: "尝试俯视角像素 RPG 支线，将寻找材料、交换物品和制作糖葫芦压缩成一条清晰任务链。",
    image: ASSETS.rpgPlayable,
  },
  {
    phase: "04",
    title: "雨伞遮罩机制实现",
    text: "用雨伞作为媒介连接两个世界：伞外是当前场景，伞下是隐藏空间与谜题路径。",
    image: ASSETS.maskDesignBoard,
  },
  {
    phase: "05",
    title: "Demo 整合与试玩",
    text: "整合 Unity 场景、UI、物品交互、任务条件、文本阅读与场景切换，形成完整可玩的 Demo。",
    image: ASSETS.dialogueScene,
  },
  {
    phase: "06",
    title: "成果展示",
    text: "项目完成后获得课程满分、老师高度评价，并取得省级一等奖成果。",
    image: ASSETS.levelMap,
  },
];

const artGallery: GalleryItem[] = [
  {
    title: "旧居民楼",
    subtitle: "倾斜、失焦、灰绿色，像一段不稳定的童年记忆。",
    image: ASSETS.oldBuilding,
    className: "lg:col-span-7",
  },
  {
    title: "老屋室内",
    subtitle: "沙发、茶几、电视、植物，把怀旧感压进日常生活。",
    image: ASSETS.roomInterior,
    className: "lg:col-span-5",
  },
  {
    title: "病房记忆",
    subtitle: "低饱和环境与人物距离感，承担更沉重的情绪段落。",
    image: ASSETS.hospital,
    className: "lg:col-span-5",
  },
  {
    title: "雨夜入口",
    subtitle: "雨伞、宿舍入口与黑夜，形成机制和情绪的交叉点。",
    image: ASSETS.rainEntrance,
    className: "lg:col-span-7",
  },
];

const techCards = [
  {
    title: "Unity 2D 场景",
    text: "基于 Sprite、正交相机、碰撞体和场景触发器组织横版探索流程。",
    image: ASSETS.roomEditor,
  },
  {
    title: "遮罩与双层地图",
    text: "用雨伞作为可视化窗口，让隐藏地图只在局部范围内出现。",
    image: ASSETS.maskMechanic,
  },
  {
    title: "任务链逻辑",
    text: "支线玩法中控制材料获取、交换、组合和糖葫芦制作的前后顺序。",
    image: ASSETS.rpgNotes,
  },
  {
    title: "文本与物品 UI",
    text: "通过日记、磁带、纸条、提示框和背包图标，承担叙事与解谜反馈。",
    image: ASSETS.memoryText,
  },
];

const awards = ["课程满分", "老师高度评价", "省级一等奖"];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32",
        className
      )}
    >
      {children}
    </section>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
  center = false,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  center?: boolean;
}) {
  return (
    <FadeIn className={cn("mb-12 max-w-3xl", center && "mx-auto text-center")}>
      <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#7c896f]">{eyebrow}</p>
      <h2 className="font-serif text-3xl font-light leading-tight tracking-[0.12em] text-[#263027] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-6 text-sm leading-8 text-[#68725e] sm:text-base">{desc}</p>
    </FadeIn>
  );
}

function AmbientBackdrop() {
  const mist = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        id: index,
        left: `${6 + index * 13}%`,
        top: `${10 + ((index * 19) % 72)}%`,
        size: 180 + ((index * 41) % 210),
        duration: 20 + index * 2.8,
      })),
    []
  );

  const rain = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${(index * 7.7) % 100}%`,
        delay: index * 0.11,
        duration: 4 + (index % 5) * 0.65,
        opacity: 0.05 + (index % 4) * 0.035,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#e7ebe0]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(245,236,206,0.72),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(141,158,126,0.28),transparent_32%),linear-gradient(180deg,#edf0e8_0%,#dfe8da_46%,#cbd8c5_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(80,88,70,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(80,88,70,0.045)_1px,transparent_1px)] bg-[size:58px_58px] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(41,48,40,0.10)_100%)]" />

      {mist.map((item) => (
        <motion.div
          key={item.id}
          className="absolute rounded-full bg-[#f3f1df]/50 blur-3xl"
          style={{ left: item.left, top: item.top, width: item.size, height: item.size * 0.56 }}
          animate={{ x: [0, 42, -22, 0], y: [0, -18, 12, 0], opacity: [0.18, 0.46, 0.28, 0.18] }}
          transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {rain.map((item) => (
        <motion.span
          key={item.id}
          className="absolute -top-24 h-28 w-px rotate-[18deg] rounded-full bg-[#6f7a68]"
          style={{ left: item.left, opacity: item.opacity }}
          animate={{ y: [0, 1080] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function FloatingNav() {
  const links = [
    ["序章", "hero"],
    ["简介", "intro"],
    ["玩法", "mechanics"],
    ["美术", "art"],
    ["历程", "timeline"],
    ["技术", "tech"],
    ["成果", "awards"],
  ];

  return (
    <motion.nav
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 rounded-full border border-[#f7efd8]/60 bg-[#eef0e3]/55 px-3 py-2 text-xs text-[#4a5545] shadow-[0_24px_90px_rgba(56,66,50,0.12)] backdrop-blur-xl md:block"
    >
      <div className="flex items-center gap-1">
        {links.map(([label, href]) => (
          <a key={href} href={`#${href}`} className="rounded-full px-4 py-2 transition hover:bg-[#f7efd8]/70 hover:text-[#293127]">
            {label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-[2px] origin-left bg-[#806d43]"
      style={{ scaleX: scrollYProgress, width: "100%" }}
    />
  );
}

function ImageFrame({
  src,
  title,
  caption,
  className,
  imageClassName,
}: {
  src: string;
  title?: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <motion.figure
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-[#f7efd8]/65 bg-[#eef1e5]/52 shadow-[0_30px_100px_rgba(56,66,50,0.13)] backdrop-blur-xl",
        className
      )}
    >
      <img
        src={src}
        alt={title || caption || "三月初七项目图片"}
        loading="lazy"
        className={cn("h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]", imageClassName)}
      />
      {(title || caption) && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10150f]/82 via-[#10150f]/42 to-transparent p-5 text-[#f6efd8]">
          {title && <h3 className="font-serif text-xl font-light tracking-[0.12em]">{title}</h3>}
          {caption && <p className="mt-2 text-xs leading-6 text-[#f5edd2]/80">{caption}</p>}
        </figcaption>
      )}
    </motion.figure>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 0.28], [0, 150]);
  const yTitle = useTransform(scrollYProgress, [0, 0.24], [0, 92]);
  // Keep hero text always visible in production deployment.
  // Earlier versions bound hero opacity to scroll progress; on some deployed/hydrated pages
  // this could make the first screen look incomplete.
  const opacity = 1;

  return (
    <section id="hero" className="relative z-10 flex min-h-screen items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-10">
      <motion.div style={{ y: yImage }} className="absolute inset-0 z-0">
        <img src={ASSETS.heroOldStreet} alt="《三月初七》旧城街道游戏截图" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(229,234,221,0.96)_0%,rgba(229,234,221,0.72)_38%,rgba(229,234,221,0.30)_72%,rgba(229,234,221,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(229,234,221,0.50)_0%,rgba(229,234,221,0.05)_45%,rgba(38,48,39,0.34)_100%)]" />
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ y: [0, -18, 10, 0], rotate: [0, 1.2, -1, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-[18%] z-10 hidden h-52 w-52 rounded-full border border-[#fff7de]/50 bg-[#f7efd8]/18 blur-[1px] backdrop-blur-sm md:block"
      />

      <motion.div style={{ y: yTitle, opacity }} className="relative z-20 mx-auto w-full max-w-7xl">
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-xs uppercase tracking-[0.62em] text-[#68745d]"
        >
          Qingming · Indie Game · Digital Exhibition
        </motion.p>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[18vw] font-light leading-none tracking-[0.18em] text-[#263027] sm:text-[12vw] lg:text-[8rem]"
        >
          三月初七
        </motion.h1>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid max-w-6xl gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <p className="font-serif text-2xl font-light leading-[1.9] tracking-[0.16em] text-[#303a2f] sm:text-4xl">
            有些人离开以后，<br />
            才终于成为我们回家的方向。
          </p>
          <div className="rounded-[2rem] border border-[#f7efd8]/70 bg-[#eef1e5]/52 p-6 text-sm leading-8 text-[#596352] shadow-[0_24px_90px_rgba(56,66,50,0.14)] backdrop-blur-xl">
            <p>
              一款以清明为主题的 2D 横版剧情解谜游戏。玩家在现实、记忆与梦境之间穿行，借由雨伞、磁带、日记和糖葫芦，重新抵达一段迟来的亲情和解。
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[0.36em] text-[#6e7a63]"
        >
          <span className="h-px w-14 bg-[#6e7a63]/50" />
          Scroll to remember
        </motion.div>
      </motion.div>
    </section>
  );
}

function Intro() {
  const cards = [
    ["游戏类型", "2D 横版剧情解谜", "以探索、互动、线索收集和情绪叙事推动流程。"],
    ["开发技术", "Unity", "使用 Unity 2D 场景、UI、触发器、任务状态与遮罩原型实现。"],
    ["叙事空间", "现实 / 记忆 / 梦境", "同一地点在不同空间中呈现不同情绪与线索。"],
    ["体验关键词", "亲情、遗憾、治愈", "恐怖只是外壳，真正的核心是迟来的理解与释怀。"],
  ];

  return (
    <Section id="intro">
      <SectionHeader
        eyebrow="01 · Game Overview"
        title="把项目介绍做成一座可进入的旧城"
        desc="这版网页不再使用抽象占位图，而是把文档图片和游戏录屏截图重新编排为叙事展览：先看见旧城，再进入机制，最后回到创作过程。"
      />

      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(([label, value, desc], index) => (
            <FadeIn key={label} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -8 }}
                className="relative min-h-[220px] overflow-hidden rounded-[2rem] border border-[#f7efd8]/65 bg-[#eef1e5]/45 p-7 shadow-[0_24px_90px_rgba(56,66,50,0.10)] backdrop-blur-xl"
              >
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#c5b683]/18 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.32em] text-[#7e8a70]">{label}</p>
                <h3 className="mt-7 font-serif text-2xl font-light tracking-[0.1em] text-[#2a3529]">{value}</h3>
                <p className="mt-5 text-sm leading-7 text-[#68725e]">{desc}</p>
              </motion.article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <div className="grid h-full min-h-[560px] gap-4 sm:grid-cols-2">
            <ImageFrame src={ASSETS.roomInterior} title="老屋" caption="生活痕迹构成最初的记忆入口。" className="min-h-[270px]" />
            <ImageFrame src={ASSETS.tapeScreen} title="磁带" caption="声音与影像成为最后一段真相的载体。" className="min-h-[270px]" />
            <ImageFrame src={ASSETS.dialogueScene} title="旧城探索" caption="真实游戏录屏截图用于增强网页可信度。" className="min-h-[270px] sm:col-span-2" />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function Mechanics() {
  const [active, setActive] = useState(mechanics[0]);

  return (
    <Section id="mechanics" className="max-w-[1500px]">
      <SectionHeader
        eyebrow="02 · Core Gameplay"
        title="让机制本身成为情绪表达"
        desc="核心玩法区使用交互式切换。每一项机制都配一张真实项目图片，让页面不只是“说这个游戏很好”，而是直接展示它如何被做出来。"
      />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="grid gap-4">
          {mechanics.map((item, index) => {
            const selected = active.id === item.id;
            return (
              <FadeIn key={item.id} delay={index * 0.06}>
                <motion.button
                  type="button"
                  onMouseEnter={() => setActive(item)}
                  onFocus={() => setActive(item)}
                  onClick={() => setActive(item)}
                  whileHover={{ x: 8 }}
                  className={cn(
                    "w-full rounded-[1.8rem] border p-6 text-left transition duration-500 backdrop-blur-xl",
                    selected
                      ? "border-[#806d43]/45 bg-[#f7efd8]/70 shadow-[0_28px_90px_rgba(94,78,44,0.16)]"
                      : "border-[#f7efd8]/60 bg-[#eef1e5]/36 hover:bg-[#f7efd8]/38"
                  )}
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-[#7e8a70]">{item.subtitle}</p>
                  <h3 className="mt-3 font-serif text-2xl font-light tracking-[0.1em] text-[#2a3529]">{item.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#dbe2d3]/70 px-3 py-1 text-[11px] tracking-[0.14em] text-[#5b6755]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.12}>
          <div className="relative min-h-[640px] overflow-hidden rounded-[2.6rem] border border-[#f7efd8]/60 bg-[#263027] p-5 shadow-[0_42px_130px_rgba(38,48,39,0.28)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(247,239,216,0.18),transparent_30%),linear-gradient(180deg,rgba(80,94,72,0.62),rgba(18,23,19,0.96))]" />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -28, filter: "blur(14px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 grid h-full gap-5"
              >
                <ImageFrame src={active.image} title={active.title} caption={active.caption} className="h-[360px] border-[#f7efd8]/20 bg-[#10150f]" />
                <div className="rounded-[2rem] border border-[#f7efd8]/16 bg-[#f7efd8]/8 p-7 text-[#f7efd8] backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.36em] text-[#cdbf8e]">Mechanic Note</p>
                  <p className="mt-5 text-sm leading-8 text-[#eee4c8]/82 sm:text-base">{active.text}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function ArtDirection() {
  const { scrollYProgress } = useScroll();
  const yOne = useTransform(scrollYProgress, [0.25, 0.68], [70, -70]);
  const yTwo = useTransform(scrollYProgress, [0.25, 0.72], [-45, 75]);

  return (
    <Section id="art" className="max-w-[1500px]">
      <SectionHeader
        eyebrow="03 · Visual Atmosphere"
        title="雾绿色、旧暖色与手绘颗粒"
        desc="这一屏重点服务作品集观感：用大图、视差、遮罩和留白展示游戏的美术气质，而不是把图片简单排成相册。"
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {artGallery.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.06} className={cn("min-h-[330px]", item.className)}>
            <motion.div style={{ y: index % 2 === 0 ? yOne : yTwo }} className="h-full">
              <ImageFrame src={item.image} title={item.title} caption={item.subtitle} className="h-full min-h-[330px]" />
            </motion.div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <FadeIn>
          <ImageFrame src={ASSETS.characterConcepts} title="角色与小幽灵" caption="人物与灵体概念，适合放在美术设定区。" className="h-[270px]" />
        </FadeIn>
        <FadeIn delay={0.06}>
          <ImageFrame src={ASSETS.spriteSheet} title="角色动画序列" caption="展示像素支线或角色动画资产。" className="h-[270px]" imageClassName="object-contain bg-[#e9eee4] p-5" />
        </FadeIn>
        <FadeIn delay={0.12}>
          <ImageFrame src={ASSETS.pickupNote} title="拾取反馈" caption="游戏截图中的拾取提示与背包 UI。" className="h-[270px]" />
        </FadeIn>
      </div>
    </Section>
  );
}

function Timeline() {
  return (
    <Section id="timeline">
      <SectionHeader
        eyebrow="04 · Creation Timeline"
        title="把一个节日命题做成一段可玩的故事"
        desc="时间轴中不只写过程，也穿插策划图、实机图和原型图，能更像“项目展览”，而不是普通课程汇报。"
        center
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#8b967d]/55 to-transparent md:left-1/2" />
        <div className="space-y-10">
          {timeline.map((item, index) => (
            <FadeIn key={item.phase} delay={index * 0.04}>
              <div className="relative grid gap-5 md:grid-cols-2 md:gap-12">
                <div className={cn("ml-14 md:ml-0", index % 2 === 1 && "md:col-start-2")}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    className="overflow-hidden rounded-[2rem] border border-[#f7efd8]/65 bg-[#eef1e5]/48 shadow-[0_28px_90px_rgba(56,66,50,0.11)] backdrop-blur-xl"
                  >
                    <img src={item.image} alt={item.title} loading="lazy" className="h-48 w-full object-cover" />
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#806d43]">Phase {item.phase}</p>
                      <h3 className="mt-3 font-serif text-2xl font-light tracking-[0.12em] text-[#2a3529]">{item.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#68725e]">{item.text}</p>
                    </div>
                  </motion.article>
                </div>
                <div className="absolute left-5 top-8 h-3 w-3 -translate-x-1/2 rounded-full border border-[#f8efd8] bg-[#806d43] shadow-[0_0_0_8px_rgba(128,109,67,0.10)] md:left-1/2" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

function TechStack() {
  return (
    <Section id="tech" className="max-w-[1500px]">
      <SectionHeader
        eyebrow="05 · Technical Implementation"
        title="让评委看见它真的被做出来了"
        desc="技术实现区使用“系统说明 + 对应截图”的形式，既保留作品集的高级感，也能清楚展示 Unity 项目的工程完成度。"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {techCards.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.05}>
            <motion.article
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-[2rem] border border-[#f7efd8]/65 bg-[#eef1e5]/48 shadow-[0_24px_90px_rgba(56,66,50,0.10)] backdrop-blur-xl"
            >
              <img src={item.image} alt={item.title} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-[#7e8a70]">System {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-serif text-2xl font-light tracking-[0.1em] text-[#2a3529]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#68725e]">{item.text}</p>
              </div>
            </motion.article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

function Awards() {
  return (
    <Section id="awards">
      <div className="relative overflow-hidden rounded-[3rem] border border-[#f7efd8]/65 bg-[#263027] px-6 py-20 text-[#f7efd8] shadow-[0_50px_140px_rgba(38,48,39,0.28)] sm:px-10 lg:px-16">
        <img src={ASSETS.heroUmbrella} alt="雨夜撑伞场景" className="absolute inset-0 h-full w-full object-cover opacity-24" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,32,26,0.94),rgba(26,32,26,0.68),rgba(26,32,26,0.92))]" />
        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <FadeIn>
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[#cdbf8e]">06 · Results</p>
              <h2 className="mt-5 font-serif text-4xl font-light leading-tight tracking-[0.12em] sm:text-6xl">获奖与成果</h2>
              <p className="mt-6 max-w-xl text-sm leading-8 text-[#eee4c8]/78">
                这里作为网页的信任锚点，克制呈现项目在课程、评价和比赛层面的结果。
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-3">
            {awards.map((item, index) => (
              <FadeIn key={item} delay={index * 0.08}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} className="rounded-[2rem] border border-[#f7efd8]/18 bg-[#f7efd8]/9 p-7 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#cdbf8e]">0{index + 1}</p>
                  <h3 className="mt-8 font-serif text-3xl font-light tracking-[0.12em]">{item}</h3>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Ending() {
  return (
    <section className="relative z-10 flex min-h-[82vh] items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-8">
      <img src={ASSETS.tapeCloseup} alt="磁带近景" className="absolute inset-0 h-full w-full object-cover opacity-18" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(247,239,216,0.68),rgba(231,235,224,0.90)_42%,rgba(231,235,224,0.98)_100%)]" />
      <FadeIn className="relative z-10">
        <p className="mx-auto max-w-4xl font-serif text-3xl font-light leading-[2.0] tracking-[0.18em] text-[#263027] sm:text-5xl">
          雨停以后，我们才明白，
          <br />
          有些告别不是离开，
          <br />
          而是终于学会好好生活。
        </p>
        <div className="mx-auto mt-14 h-px w-28 bg-[#806d43]/45" />
        <p className="mt-8 text-xs uppercase tracking-[0.5em] text-[#7c896f]">San Yue Chu Qi · Interactive Showcase</p>
      </FadeIn>
    </section>
  );
}

export default function SanYueChuQiShowcasePage() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-[#e7ebe0] text-[#263027] selection:bg-[#cdbf8e]/40 selection:text-[#263027]"
      style={{ fontFamily: "'Noto Serif SC', 'Songti SC', 'STSong', serif" }}
    >
      <ProgressBar />
      <AmbientBackdrop />
      <FloatingNav />
      <Hero />
      <Intro />
      <Mechanics />
      <ArtDirection />
      <Timeline />
      <TechStack />
      <Awards />
      <Ending />
    </main>
  );
}
