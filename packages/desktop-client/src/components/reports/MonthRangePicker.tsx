import { useRef, useState } from 'react';

import { Button } from '@actual-app/components/button';
import { useResponsive } from '@actual-app/components/hooks/useResponsive';
import { Popover } from '@actual-app/components/popover';
import { Text } from '@actual-app/components/text';
import { View } from '@actual-app/components/view';
import { theme } from '@actual-app/components/theme';

type MonthRangePickerProps = {
  start: string;
  end: string;
  onChangeDates: (start: string, end: string) => void;
};

const months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec',
];

const presets = [
  '1 month',
  '3 months',
  '6 months',
  '1 year',
  'Year to date',
  'Last month',
  'Last year',
  'All time',
];

export function MonthRangePicker({
  start,
  end,
  onChangeDates,
}: MonthRangePickerProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isNarrowWidth } = useResponsive();

  const startYear = start?.slice(0, 4) || '2024';
  const endYear = end?.slice(0, 4) || '2024';

  const isSelectedMonth = (date: string, monthIndex: number) =>
    date?.endsWith(`-${String(monthIndex + 1).padStart(2, '0')}`);

  return (
    <View>
      <Button ref={triggerRef} onPress={() => setIsOpen(!isOpen)}>
        {start} to {end}
      </Button>

      <Popover
        triggerRef={triggerRef}
        placement="bottom start"
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        style={{ padding: 0, width: isNarrowWidth ? 300 : 500 }}
      >
        <View style={{ flexDirection: isNarrowWidth ? 'column' : 'row' }}>
          {/* Month selectors */}
          <View
            style={{
              flex: 1,
              padding: 15,
              ...(isNarrowWidth
                ? { borderBottom: `1px solid ${theme.tableBorder}` }
                : { borderRight: `1px solid ${theme.tableBorder}` }),
            }}
          >
            {/* Start Month Selector */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginBottom: 8,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: theme.pageTextSubdued,
                }}
              >
                Start
              </Text>
              {/* Year navigation */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Button variant="bare">←</Button>
                <Text style={{ fontWeight: 'bold' }}>{startYear}</Text>
                <Button variant="bare">→</Button>
              </View>
              {/* Month grid 4x3 */}
              <View
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 4,
                }}
              >
                {months.map((month, i) => (
                  <Button
                    key={month}
                    variant={isSelectedMonth(start, i) ? 'primary' : 'bare'}
                    style={{
                      padding: '8px 4px',
                      fontSize: 12,
                    }}
                  >
                    {month}
                  </Button>
                ))}
              </View>
            </View>

            {/* End Month Selector */}
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginBottom: 8,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: theme.pageTextSubdued,
                }}
              >
                End
              </Text>
              {/* Year navigation */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Button variant="bare">←</Button>
                <Text style={{ fontWeight: 'bold' }}>{endYear}</Text>
                <Button variant="bare">→</Button>
              </View>
              {/* Month grid 4x3 */}
              <View
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 4,
                }}
              >
                {months.map((month, i) => (
                  <Button
                    key={month}
                    variant={isSelectedMonth(end, i) ? 'primary' : 'bare'}
                    style={{
                      padding: '8px 4px',
                      fontSize: 12,
                    }}
                  >
                    {month}
                  </Button>
                ))}
              </View>
            </View>
          </View>

          {/* Quick presets */}
          <View style={{ width: isNarrowWidth ? 'auto' : 140, padding: 15 }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 8,
                fontSize: 12,
                textTransform: 'uppercase',
                color: theme.pageTextSubdued,
              }}
            >
              Quick Select
            </Text>
            <View style={{ gap: 4 }}>
              {presets.map(preset => (
                <Button
                  key={preset}
                  variant="bare"
                  style={{
                    justifyContent: 'flex-start',
                    fontSize: 13,
                  }}
                >
                  {preset}
                </Button>
              ))}
            </View>
          </View>
        </View>
      </Popover>
    </View>
  );
}
