export interface ComponentProps {
  [key: string]: {
    type: string;
    description: string;
    required?: boolean;
    defaultValue?: any;
  };
}

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  props: Record<string, any>;
}

export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  component: React.ComponentType<any>;
  codeExample: string;
  props?: ComponentProps;
  variants?: ComponentVariant[];
}

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  components: Component[];
}

export interface LibraryState {
  components: Component[];
  categories: ComponentCategory[];
  searchTerm: string;
  selectedCategory: string | null;
  selectedComponent: Component | null;
}