import type * as React from 'react';

type Marca = 'ark' | 'iris' | 'pulse';
type IconName = 'home' | 'store' | 'menu' | 'users' | 'user' | 'plus' | 'search' | 'close' | 'chevronRight' | 'chevronLeft' | 'chevronDown' | 'check' | 'info' | 'alert'
  | 'calendar' | 'clock' | 'lock' | 'sun' | 'moon' | 'settings' | 'logout' | 'chart' | 'code' | 'pulse' | 'chat' | 'mail' | 'phone' | 'pin' | 'edit' | 'trash'
  | 'filter' | 'external' | 'arrowRight' | 'heart' | 'star';
type Tom = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger';

/** Logo de cada marca. Ark: casco + THE ARK GROUP. Íris: íris + íris. Pulse: só o nome (sem símbolo ainda). */
export interface LogoProps { brand?: Marca; size?: number; markOnly?: boolean; name?: string }
export declare function Logo(props: LogoProps): React.ReactElement;

export interface IconProps { name: IconName; size?: number; filled?: boolean; color?: string }
export declare function Icon(props: IconProps): React.ReactElement;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'soft' | 'danger' | 'danger-outline';
  size?: 'sm' | 'md' | 'lg'; block?: boolean; pill?: boolean;
  loading?: boolean; loadingText?: string; href?: string; iconLeft?: IconName; iconRight?: IconName;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { icon: IconName; label: string; variant?: 'plain' | 'outline' | 'solid'; size?: 'sm' | 'md' }
export declare function IconButton(props: IconButtonProps): React.ReactElement;

export interface ThemeToggleProps { dark?: boolean; defaultDark?: boolean; onChange?: (dark: boolean) => void }
export declare function ThemeToggle(props: ThemeToggleProps): React.ReactElement;

export interface FavoriteButtonProps { active?: boolean; defaultActive?: boolean; label?: string; onToggle?: (active: boolean) => void }
export declare function FavoriteButton(props: FavoriteButtonProps): React.ReactElement;

export interface TextFieldProps {
  id: string; label: string; hint?: string; error?: string; optional?: boolean; disabled?: boolean;
  value?: string; defaultValue?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string; maxLength?: number; showCount?: boolean; multiline?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number'; inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'decimal'; autoComplete?: string; required?: boolean;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;

export interface SearchFieldProps { id?: string; label?: string; hideLabel?: boolean; placeholder?: string; value?: string; defaultValue?: string; onChange?: (value: string) => void }
export declare function SearchField(props: SearchFieldProps): React.ReactElement;

export interface SelectProps { id: string; label: string; options: (string | { value: string; label: string })[]; placeholder?: string; hint?: string; error?: string; optional?: boolean; disabled?: boolean; required?: boolean; value?: string; defaultValue?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }
export declare function Select(props: SelectProps): React.ReactElement;

export interface CheckboxProps { id: string; label: React.ReactNode; description?: string; checked?: boolean; defaultChecked?: boolean; disabled?: boolean; onChange?: (checked: boolean) => void }
export declare function Checkbox(props: CheckboxProps): React.ReactElement;

export interface SwitchProps { id: string; label: string; description?: string; checked?: boolean; defaultChecked?: boolean; disabled?: boolean; onChange?: (checked: boolean) => void }
export declare function Switch(props: SwitchProps): React.ReactElement;

export interface SegmentedProps { options: { id: string; label: string }[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; label?: string }
export declare function Segmented(props: SegmentedProps): React.ReactElement;

export interface BadgeProps { tone?: Tom; status?: 'ativo' | 'concluido' | 'cancelado' | 'falta' | 'pendente' | 'aberto' | 'fechado' | 'bloqueado' | 'embreve' | 'novo'; children?: React.ReactNode }
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface ChipProps { children: React.ReactNode; icon?: IconName; selected?: boolean; onClick?: () => void }
export declare function Chip(props: ChipProps): React.ReactElement;

export interface AvatarProps { name?: string; src?: string; alt?: string; size?: number }
export declare function Avatar(props: AvatarProps): React.ReactElement;

export interface RatingProps { value?: number; count?: number; compact?: boolean; editable?: boolean; defaultValue?: number; label?: string; onChange?: (n: number) => void }
export declare function Rating(props: RatingProps): React.ReactElement;

export interface CardProps { title?: React.ReactNode; text?: React.ReactNode; icon?: IconName | React.ReactNode; number?: string; badge?: string; footer?: React.ReactNode; tone?: 'surface' | 'sunken' | 'outline' | 'brand'; size?: 'sm' | 'md'; href?: string; onClick?: () => void; children?: React.ReactNode }
export declare function Card(props: CardProps): React.ReactElement;

export interface StatBarProps { items: { value: string; label: string }[] }
export declare function StatBar(props: StatBarProps): React.ReactElement;

export interface EyebrowProps { children: React.ReactNode; tone?: 'brand' | 'muted'; parens?: boolean }
export declare function Eyebrow(props: EyebrowProps): React.ReactElement;

export interface SectionHeaderProps { title: React.ReactNode; eyebrow?: string; eyebrowTone?: 'brand' | 'muted'; text?: React.ReactNode; align?: 'left' | 'center'; size?: 'section' | 'hero'; level?: 1 | 2 | 3; actions?: React.ReactNode }
export declare function SectionHeader(props: SectionHeaderProps): React.ReactElement;

export interface ListItemProps { title: React.ReactNode; subtitle?: React.ReactNode; icon?: IconName; avatar?: string; leading?: React.ReactNode; trailing?: React.ReactNode; href?: string; onClick?: () => void; chevron?: boolean }
export declare function ListItem(props: ListItemProps): React.ReactElement;

export interface NumberedListProps { items: { title: string; text?: string }[]; start?: number }
export declare function NumberedList(props: NumberedListProps): React.ReactElement;

export interface StepsProps { items: { title: string; text?: string }[]; direction?: 'column' | 'row' }
export declare function Steps(props: StepsProps): React.ReactElement;

export interface TableProps { columns: { key: string; label: string; align?: 'left' | 'right' | 'center' }[]; rows: Record<string, React.ReactNode>[]; caption?: string; empty?: string }
export declare function Table(props: TableProps): React.ReactElement;

export interface ServiceItemProps { name: string; description?: string; duration: string; price: number; priceFrom?: boolean; selected?: boolean; defaultSelected?: boolean; onToggle?: (selected: boolean) => void; favorite?: boolean; onFavorite?: false }
export declare function ServiceItem(props: ServiceItemProps): React.ReactElement;

export interface ProfessionalRowProps { name: string; subtitle?: string; selected?: boolean; onSelect?: () => void; favorite?: boolean; anyone?: boolean }
export declare function ProfessionalRow(props: ProfessionalRowProps): React.ReactElement;

export interface EstablishmentCardProps { name: string; category?: string; distance?: string; rating?: number; open?: boolean; image?: string; color?: string; href?: string }
export declare function EstablishmentCard(props: EstablishmentCardProps): React.ReactElement;

export interface AlertProps { tone?: 'info' | 'success' | 'warning' | 'danger'; title?: string; children?: React.ReactNode; action?: React.ReactNode }
export declare function Alert(props: AlertProps): React.ReactElement;

export interface ToastProps { tone?: 'success' | 'danger' | 'info'; children: React.ReactNode }
export declare function Toast(props: ToastProps): React.ReactElement;

export interface SkeletonProps { width?: number | string; height?: number | string; radius?: number; circle?: boolean }
export declare function Skeleton(props: SkeletonProps): React.ReactElement;

export interface SkeletonCardProps { variant?: 'list' | 'establishment' | 'service' | 'booking' | 'card' }
export declare function SkeletonCard(props: SkeletonCardProps): React.ReactElement;

export interface EmptyStateProps { title: string; text?: string; icon?: IconName; action?: React.ReactNode }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;

export interface OverlayProps { id: string; title: string; text?: string; tone?: 'brand' | 'warning' | 'danger' | 'info'; icon?: IconName; alert?: boolean; actions?: React.ReactNode; children?: React.ReactNode; hostHeight?: number }
export declare function BottomSheet(props: OverlayProps): React.ReactElement;
export interface DialogProps extends OverlayProps { onClose?: () => void }
export declare function Dialog(props: DialogProps): React.ReactElement;

export interface TopBarProps { title: string; back?: boolean; backHref?: string; onBack?: () => void; action?: React.ReactNode }
export declare function TopBar(props: TopBarProps): React.ReactElement;

export interface NavItem { id: string; label: string; icon: IconName; href?: string; count?: number }
export interface TabBarProps { items?: NavItem[]; active?: string; onNavigate?: (id: string) => void; label?: string }
export declare function TabBar(props: TabBarProps): React.ReactElement;
export interface SideNavProps { items: NavItem[]; active?: string; onNavigate?: (id: string) => void; brand?: Marca; brandName?: string; footer?: React.ReactNode; label?: string }
export declare function SideNav(props: SideNavProps): React.ReactElement;

export interface SiteHeaderProps { brand?: Marca; brandName?: string; homeHref?: string; links?: { label: string; href?: string }[]; cta?: { label: string; href?: string }; pill?: boolean; themeToggle?: boolean; dark?: boolean; defaultDark?: boolean; onThemeChange?: (dark: boolean) => void; sticky?: boolean }
export declare function SiteHeader(props: SiteHeaderProps): React.ReactElement;

export interface FooterProps { brand?: Marca; brandName?: string; tagline?: string; columns?: { title: string; items: (string | { label: string; href?: string })[] }[]; legal?: string; bottomLinks?: { label: string; href?: string }[] }
export declare function Footer(props: FooterProps): React.ReactElement;

export interface AccordionProps { items: { q: string; a: string }[]; defaultOpen?: number }
export declare function Accordion(props: AccordionProps): React.ReactElement;

export interface ComparisonProps { before: { title: string; items: string[] }; after: { title: string; items: string[] } }
export declare function Comparison(props: ComparisonProps): React.ReactElement;

export interface PlanCardProps { name: string; description?: string; price?: string; period?: string; features?: string[]; cta?: { label: string; href?: string }; highlight?: boolean; badge?: string; soon?: boolean }
export declare function PlanCard(props: PlanCardProps): React.ReactElement;

export interface PriceListProps { items: { name: string; desc?: string; price: string }[] }
export declare function PriceList(props: PriceListProps): React.ReactElement;

declare global {
  interface Window {
    Ark: {
      Logo: typeof Logo; Icon: typeof Icon; Button: typeof Button; IconButton: typeof IconButton; ThemeToggle: typeof ThemeToggle; FavoriteButton: typeof FavoriteButton;
      TextField: typeof TextField; SearchField: typeof SearchField; Select: typeof Select; Checkbox: typeof Checkbox; Switch: typeof Switch; Segmented: typeof Segmented;
      Badge: typeof Badge; StatusBadge: typeof Badge; Chip: typeof Chip; Avatar: typeof Avatar; Rating: typeof Rating; Card: typeof Card; StatBar: typeof StatBar;
      Eyebrow: typeof Eyebrow; SectionHeader: typeof SectionHeader; ListItem: typeof ListItem; NumberedList: typeof NumberedList; Steps: typeof Steps; Table: typeof Table;
      ServiceItem: typeof ServiceItem; ProfessionalRow: typeof ProfessionalRow; EstablishmentCard: typeof EstablishmentCard; Alert: typeof Alert; Toast: typeof Toast;
      Skeleton: typeof Skeleton; SkeletonCard: typeof SkeletonCard; EmptyState: typeof EmptyState; BottomSheet: typeof BottomSheet; Dialog: typeof Dialog;
      TopBar: typeof TopBar; TabBar: typeof TabBar; SideNav: typeof SideNav; SiteHeader: typeof SiteHeader; Footer: typeof Footer;
      Accordion: typeof Accordion; Comparison: typeof Comparison; PlanCard: typeof PlanCard; PriceList: typeof PriceList;
    };
  }
}
