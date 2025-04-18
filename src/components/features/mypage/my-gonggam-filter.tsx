import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface SelectBoxProps {
  value: string;
  onChange: (sort: string) => void;
}

export function SelectBox({ value, onChange }: SelectBoxProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-[44px] w-[109px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="latest">최신순</SelectItem>
          <SelectSeparator />
          <SelectItem value="comments">댓글 많은 순</SelectItem>
          <SelectSeparator />
          <SelectItem value="likes">공감 많은 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
