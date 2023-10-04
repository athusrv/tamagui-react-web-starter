import { useThemeSetting } from "@tamagui/next-theme";
import { Button, XStack } from "tamagui";

const Page = () => {
  const { toggle } = useThemeSetting();
  return (
    <XStack space="16px">
      <Button onPress={toggle}>Hello</Button>
    </XStack>
  );
};

export default Page;
