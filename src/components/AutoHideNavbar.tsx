import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AutoHideNavbarProps = {
  children?: ReactNode; // 상단 바 내부에 들어갈 내용 (버튼 등)
  height?: number; // 상단 바의 높이 (px)
  hideThreshold?: number; // 상단 바가 사라지기 시작하는 스크롤 Y 값 (px)
};

const AutoHideNavbar = ({
  children,
  height = 60, // 기본 높이 60px
  hideThreshold = 100, // 100px 스크롤 다운 후부터 숨김 반응 시작
}: AutoHideNavbarProps) => {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navbarRef.current) return;

    const navElement = navbarRef.current;
    const navbarHeight = navElement.offsetHeight || height; // 실제 측정 높이 또는 props 높이

    // 초기 위치 설정 (보이는 상태)
    gsap.set(navElement, { y: 0 });

    // ScrollTrigger 설정
    const st = ScrollTrigger.create({
      trigger: document.body, // 전체 페이지 스크롤 감지
      start: 'top top', // 스크롤 감지 시작점
      end: 'max', // 스크롤 감지 끝점 (페이지 끝까지)
      onUpdate: (self) => {
        const { direction } = self;
        const currentScrollY = self.scroll(); // self.scrollY 대신 self.scroll() 사용

        // 스크롤을 아래로 내리고, hideThreshold를 넘었을 때
        if (direction === 1 && currentScrollY > hideThreshold) {
          gsap.to(navElement, {
            y: -navbarHeight, // Navbar 높이만큼 위로 이동하여 숨김
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto', // 진행 중인 애니메이션이 있다면 자동으로 덮어씀
          });
        }
        // 스크롤을 위로 올리거나, hideThreshold 이내로 돌아왔을 때
        else if (direction === -1 || currentScrollY <= hideThreshold) {
          gsap.to(navElement, {
            y: 0, // 원래 위치로 돌아와서 보임
            duration: 0.3,
            ease: 'power2.inOut',
            overwrite: 'auto',
          });
        }
      },
    });

    // 컴포넌트 언마운트 시 ScrollTrigger 인스턴스 정리
    return () => {
      st.kill();
      // Navbar에 적용된 GSAP 애니메이션도 정리 (선택 사항)
      gsap.killTweensOf(navElement);
    };
  }, [height, hideThreshold]); // height나 hideThreshold prop이 변경되면 useEffect 재실행

  return (
    <div
      ref={navbarRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        margin: '0 auto',
        width: '425px',
        height: `${height}px`,
        backgroundColor: 'white',
        zIndex: 1000,
        display: 'flex', // 내부 요소 정렬을 위해 flex 사용 가능
        alignItems: 'center',
        justifyContent: 'space-between', // 예시: 내부 요소 양쪽 정렬
        padding: '0 20px', // 내부 여백
        boxSizing: 'border-box',
        // 초기에는 transform: translateY(0) 상태입니다.
      }}
    >
      {children || <p>상단 바 내용</p>}{' '}
      {/* 전달된 children 또는 기본 텍스트 표시 */}
    </div>
  );
};

export default AutoHideNavbar;
