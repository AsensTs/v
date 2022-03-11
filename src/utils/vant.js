
import { 
  Button,
  // Cell,
  // CellGroup,
  // ConfigProvider,
  Icon,
  // Image as VanImage,
  Col, 
  Row,
  // Popup,
  // Toast,
  // Calendar,
  // Cascader,
  // Checkbox, 
  // CheckboxGroup,
  // DatetimePicker,
  // Form,
  // Field,
  // NumberKeyboard,
  // PasswordInput,
  // Picker,
  // RadioGroup, 
  // Radio,
  // Rate,
  Search,
  // Slider,
  // Stepper,
  // Switch,
  // Uploader,
  // ActionSheet,
  // Dialog,
  // DropdownMenu, 
  // DropdownItem,
  // Loading,
  // Notify,
  // Overlay,
  PullRefresh,
  // ShareSheet,
  // SwipeCell,
  // Badge,
  // Circle,
  // Collapse, 
  // CollapseItem,
  // CountDown,
  // Divider,
  // Empty,
  // ImagePreview,
  // Lazyload,
  // List,
  // NoticeBar,
  // Popover,
  // Progress,
  // Skeleton,
  // Step, 
  // Steps,
  // Sticky,
  // Swipe, 
  // SwipeItem,
  // Tag,
  // ActionBar, 
  // ActionBarIcon, 
  // ActionBarButton,
  // Grid, 
  // GridItem,
  // IndexBar, 
  // IndexAnchor,
  // NavBar,
  // Pagination,
  // Sidebar, 
  // SidebarItem,
  // Tab, 
  // Tabs,
  // Tabbar, 
  // TabbarItem,
  // TreeSelect,
  // AddressEdit,
  // AddressList,
  // Area,
  Card,
  // ContactCard,
  // ContactEdit,
  // ContactList,
  // CouponCell,
  // CouponList,
  // SubmitBar
} from "vant";

const vant =  {
  Button,
  // Cell,
  // CellGroup,
  // ConfigProvider,
  Icon,
  // VanImage,
  Col, 
  Row,
  // Popup,
  // Toast,
  // Calendar,
  // Cascader,
  // Checkbox, 
  // CheckboxGroup,
  // DatetimePicker,
  // Form,
  // Field,
  // NumberKeyboard,
  // PasswordInput,
  // Picker,
  // RadioGroup, 
  // Radio,
  // Rate,
  Search,
  // Slider,
  // Stepper,
  // Switch,
  // Uploader,
  // ActionSheet,
  // Dialog,
  // DropdownMenu, 
  // DropdownItem,
  // Loading,
  // Notify,
  // Overlay,
  PullRefresh,
  // ShareSheet,
  // SwipeCell,
  // Badge,
  // Circle,
  // Collapse, 
  // CollapseItem,
  // CountDown,
  // Divider,
  // Empty,
  // ImagePreview,
  // Lazyload,
  // List,
  // NoticeBar,
  // Popover,
  // Progress,
  // Skeleton,
  // Step, 
  // Steps,
  // Sticky,
  // Swipe, 
  // SwipeItem,
  // Tag,
  // ActionBar, 
  // ActionBarIcon, 
  // ActionBarButton,
  // Grid, 
  // GridItem,
  // IndexBar, 
  // IndexAnchor,
  // NavBar,
  // Pagination,
  // Sidebar, 
  // SidebarItem,
  // Tab, 
  // Tabs,
  // Tabbar, 
  // TabbarItem,
  // TreeSelect,
  // AddressEdit,
  // AddressList,
  // Area,
  Card,
  // ContactCard,
  // ContactEdit,
  // ContactList,
  // CouponCell,
  // CouponList,
  // SubmitBar
}

const useVant = (fn) => {
  Reflect.ownKeys(vant).forEach((key) => {
    fn(vant[key]);
  })
}

export default useVant;