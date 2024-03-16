import { fn } from '@storybook/test';
import MyButton from './Button.vue';

export default {
  title: 'Components/UI/Button',
  component: MyButton,
  tags: ['ui', 'button', 'component'],
  argTypes: {
    text: { control: 'text' },
    primary: { control: 'boolean' },
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
  },
  args: {
    onClick: fn(),
  },
};

export const PrimaryButton = {
  args: {
    primary: true,
    text: 'Primary Button',
  },
};

export const SecondaryButton = {
  args: {
    primary: false,
    text: 'Secondary Button',
  },
};

export const LargeButton = {
  args: {
    size: 'large',
    text: 'Large Button',
  },
};

export const SmallButton = {
  args: {
    size: 'small',
    text: 'Small Button',
  },
};
