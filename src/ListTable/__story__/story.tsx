import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {ListTable} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('UI/ListTable', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ListTable.md')}))
  .add('Default', () =>
    <ListTable>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </ListTable>
  )
  .add('Empty list', () =>
    <ListTable>
    </ListTable>
  )
  .add('Full two rows', () =>
    <ListTable>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ListTable>
  )
  .add('1 column', () =>
    <ListTable cols={1}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ListTable>
  )
  .add('2 columns', () =>
    <ListTable cols={2}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ListTable>
  )
  .add('3 columns', () =>
    <ListTable cols={3}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ListTable>
  )
  .add('5 columns', () =>
    <ListTable cols={5}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ListTable>
  )
  .add('6 columns', () =>
    <ListTable cols={6}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ListTable>
  )
  .add('7 columns', () =>
    <ListTable cols={7}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ListTable>
  )
  .add('User renderRow', () =>
    <ListTable cols={3} renderRow={(cells) => {
      return (
        <tr style={{outline: '1px solid tomato'}}>
          {cells}
        </tr>
      );
    }}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ListTable>
  )
  .add('Cells as text', () =>
    <ListTable cols={2}>
      {'1'}
      {'2'}
      {'3'}
      {'4'}
      {'5'}
      {'6'}
    </ListTable>
  )