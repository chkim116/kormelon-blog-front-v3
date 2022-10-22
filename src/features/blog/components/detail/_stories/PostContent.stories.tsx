import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostContent } from '../PostContent';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostContent>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'posts/detail/PostContent',
  component: PostContent,
  argTypes,
} as ComponentMeta<typeof PostContent>;

const Template: ComponentStory<typeof PostContent> = ({ ...props }) => (
  <PostContent {...props} />
);

export const Default = Template.bind({});
Default.args = {
  content:
    '<h1 id="1-gitnation">1. gitnation</h1> <p><a href="https://portal.gitnation.org/">https://portal.gitnation.org/</a></p> <p>자바스크립트 진영에 대한 영상들이 모여있는 사이트. 자바스크립트는 물론 타입스크립트, 노드, 리액트 등 거의 모든 분야에 걸쳐 영상이 있다. 디자인 패턴이나 라이브러리 설계 등에 대한 이야기도 있으며 심지어 게임 관련도 있다. 심심할 때 보면 좋아 보인다. </p> <p>특히나 발표자의 스펙들이 심심치 않다. 구글도 있고, 깃헙 개발자도 있다. 역시 영어를 알면 지식의 넓이가 달라진다. 영어 배워야 겠다는 욕구가 뿜뿜(?)</p> <h1 id="2-patterns">2. patterns</h1> <p><a href="https://www.patterns.dev/posts/introduction/">https://www.patterns.dev/posts/introduction/</a></p> <p>다양한 디자인 패턴들을 자바스크립트를 예시로 활용하여 정리한 문서 사이트다. 비슷한 예로 <a href="https://refactoring.guru/">refactoring.guru</a>가 있긴 한데, 이 사이트가 좀 더 가독성이 좋다. </p> <p>디자인 패턴 이외에도 퍼포먼스 패턴, 렌더링 패턴 등 프론트엔드 특화 문서도 있다.</p> <h1 id="3-frontendmastery">3. frontendmastery</h1> <p><a href="https://frontendmastery.com/">https://frontendmastery.com/</a></p> <p>이름이 상당한 어그로(?)끼가 있는데 우려와는 달리 아티클의 주제가 심상치 않고 그 내용 역시 질이 좋다. 찍먹하고 끝나는 많은 블로그 글과는 달리, 비교적 심도있게 아키텍처를 다루는 아티클도 있다.</p> <p>다만, 게시된 글이 많은 편이 아니다.</p> <h1 id="4-사용자가-웹-페이지를-탐색하는-방법">4. 사용자가 웹 페이지를 탐색하는 방법</h1> <p><a href="https://www.beusable.net/blog/?p=1505">https://www.beusable.net/blog/?p=1505</a></p> <p>사이트 자체를 소개한 위 3개와는 달리 네번째는 UX 관련된 글이다. 프론트엔드 개발자인 만큼 UX에 신경써야 하니 섭섭치 않게 넣어보았다.</p> <p>유저가 웹 페이지를 탐색할 때 어떤 식으로 눈이 이동하는 지에 대한 이야기다.</p> ',
};
