import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { MemoryRouter } from 'react-router';

import CustomIcons, {iconTypes} from '../UI/CustomIcons';
import DataPreviewGoogleViewer from '../UI/DataPreviewGoogleViewer';
import DataPreviewJson from '../UI/DataPreviewJson';
import DataPreviewTable from '../UI/DataPreviewTable';
import DataPreviewTextBox from '../UI/DataPreviewTextBox';
import DataPreviewVega from '../UI/DataPreviewVega';
import DropDown from '../UI/DropDown';
import MarkdownViewer from '../UI/MarkdownViewer';
import News from '../UI/News';
import Notification from '../UI/Notification';
import OverviewBox from '../UI/OverviewBox';
import Pagination from '../UI/Pagination';
import ProgressBar from '../UI/ProgressBar';
import QualityIndicator from '../UI/QualityIndicator';
import TemporalAspectViewer from '../UI/TemporalAspectViewer';
import ToggleList from '../UI/ToggleList';
import Tabs from '../UI/Tabs';
import ContactForm from '../UI/ContactForm';


const exampleData = {
  meta: {
    chartFields: {
      numeric: ['a'],
      time: ['date']
    },
    fields: ['a', 'date'],
    type: 'chart'
  },
  data: [{date: '2017-12-22', a: '10'},
         {date: '2017-12-23', a: '30'},
         {date: '2017-12-24', a: '40'},
         {date: '2017-12-25', a: '20'},
         {date: '2017-12-26', a: '30'}]
}

const exampleMarkdown = `# Cinctaque restagnantis rerum quoque divae putas vitis

## Custos fauni quam fores

Lorem markdownum. Mente qui pressit simul Hector diris; dixit vivam ominibus
lacrimae inputet, promissa. Restare nec iunxit *intrasse maduere* nobiliumque
doctam limite nisi; adpulit est lacerto, inquit.

**Axem opus** auras sinusque me manus et calidis nemus canamus. Tanto quae
animum inponere quietem? Vinctae et mando vivere sustineam resilit militiam
tacitos ille pondus clipeoque **vomit**. Qui arcem. Cum diu, misit deficeret
texit ad quos, ferar aratro praecipue.`;

const exampleNews = [{link: '', title: 'news 1', contentSnippet: 'aaa'}, {link: '', title: 'news 2', contentSnippet: 'bbb'}, {link: '', title: 'news 3', contentSnippet: 'ccc'}];



storiesOf('Shared UI', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('DropDown', ()=><DropDown options={[{id: 0, value: 'a'},{id: 1, value: 'b'}, {id: 2, value: 'c'} ]} select={action()}/>)
    .add('ToggleList', ()=><ToggleList list={[{id: 0, title: 'item a'},{id: 1, title: 'item b'}, {id: 2, title: 'item c'} ]} select={action()} renderFunction={(item)=><div>{item.title}</div>} getKey={item => item.id} defaultLength={2}/>)
    .add('Markdown', ()=><MarkdownViewer markdown={exampleMarkdown} updateContentLength={action()}/>)
    .add('ProgressBar', ()=><ProgressBar />)
    .add('Tabs', ()=><Tabs list={[{id: 'a', name: 'A', isActive: true}, {id: 'b', name: 'B', isActive: true}, {id: 'c', name: 'C', isActive: true}]}/>)

storiesOf('Quality Indicator', module)
    .add('quality = 1.0', ()=> <QualityIndicator quality={1.0}/>)
    .add('quality = 0.5', ()=> <QualityIndicator quality={0.5}/>)
    .add('quality = 0.1', ()=> <QualityIndicator quality={0.1}/>);

storiesOf('Pagination', module)
    .add('page 1', ()=><Pagination currentPage={1} maxPage={100} onPageChange={action()}/>)
    .add('page 3', ()=><Pagination currentPage={3} maxPage={100} onPageChange={action()}/>)
    .add('last page', ()=><Pagination currentPage={100} maxPage={100} onPageChange={action()}/>);

storiesOf('Notification', module)
    .add('Default notification', ()=><Notification content={{title: '', detail: 'This is a default message'}} type='' onDismiss={action()}/>)
    .add('Error notification', ()=><Notification content={{title: '', detail: 'This is a error message'}} type='error' onDismiss={action()}/>)

storiesOf('News', module)
    .add('News loading', ()=><News isFetching={true}/>)
    .add('News loading failed', ()=><News error={{title: '404', detail: 'cannot load'}}/>)
    .add('News loaded', ()=><News newsItems={exampleNews}/>);

storiesOf('OverviewBox', module)
    .add('Long overview', ()=><OverviewBox content={exampleMarkdown}/>)
    .add('Short overview', ()=><OverviewBox content={"exampleMarkdown"}/>);

storiesOf('Aspect Viewer', module)
    .add('Temporal Aspect Viewer', ()=><TemporalAspectViewer data={{intervals: [{start: '2017-12-25', end: '2017-12-25'}]}} />)

storiesOf('Contact Form', module)
    .add('Generic contact from', ()=><Contact/>)

iconTypes.map(iconname =>
  storiesOf('Icons', module)
      .add(iconname, () => <CustomIcons name={iconname}/>)
)

storiesOf('Dataset preview', module)
    .add('DataPreviewGoogleViewer', () => <DataPreviewGoogleViewer data={{data: "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"}}/>)
    .add('DataPreviewJson', ()=><DataPreviewJson data={{data: {object : {test: 1}}}}/>)
    .add('DataPreviewTable', ()=><DataPreviewTable data={exampleData}/>)
    .add('DataPreviewTextBox', ()=><DataPreviewTextBox data={{data: 'some text'}}/>)
    .add('DataPreviewVega', ()=><DataPreviewVega data={exampleData} logAction={action()}/>);
