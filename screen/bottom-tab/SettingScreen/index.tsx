import HeaderHome from '@/components/commons/HeaderHome';
import BottomSheetAction from '@/components/ui/BottomSheetAction';
import CardUi from '@/components/ui/CardUi';
import useColor from '@/hooks/useColor';
import { toastCommingSoon } from '@/lib/toast';
import { useLang } from '@/stores/useLang';
import { useTheme } from '@/stores/useTheme';
import { PADDING_PAGE } from '@/theme/layout';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RowSelect from './components/RowSelect';

const listLanguage = [
  {
    text: "lang.vn",
    code: "vn"
  },
  {
    text: "lang.en",
    code: "en"
  },
  {
    text: "lang.lo",
    code: "lo"
  }
]

export default function UserScreen() {
  const color = useColor()

  const router = useRouter()

  const { setLang, lang } = useLang()

  const textLang = listLanguage.find(l => l.code === lang)?.text

  const [openChangeLang, setOpenChangeLang] = useState(false)

  // theme
  const { changeTheme, theme } = useTheme()
  const renderTextTheme = useMemo(() => {
    switch (theme) {
      case "dart":
        return "theme.dart"
      case "light":
        return "theme.light"
      default: return "theme.auto"
    }
  }, [theme])

  const actions = [
    {
      text: "user.lang",
      icon: <Feather name="globe" size={18} color={color.text} />,
      textValue: textLang,
      onPress: () => {
        toastCommingSoon()
        // setOpenChangeLang(true)
      }
    },
    {
      text: "user.theme",
      icon: <Feather name="moon" size={18} color={color.text} />,
      textValue: renderTextTheme,
      onPress: changeTheme
    },

     {
      text: "Điều khoản sử dụng",
      icon: <Feather name="shield" size={18} color={color.text} />,
      onPress: () => router.push("/tems/terms-of-use")
    },
    {
      text: "Chính sách bảo mật",
      icon: <Feather name="shield" size={18} color={color.text} />,
       onPress: () => router.push("/tems/confidentiality-policy")
    },
  ]

  return (
    <View>
      <HeaderHome title='Tài khoản' />
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: color.bg }]}>

        <View style={styles.content}>

          <CardUi>
            {
              actions.map((a, index) => (
                <RowSelect
                  key={index}
                  {...a}
                />
              ))
            }
          </CardUi>
        </View>

        <BottomSheetAction
          isModalVisible={openChangeLang}
          setModalVisible={setOpenChangeLang}
          actions={listLanguage.map(l => ({
            text: l.text,
            onPress: () => {
              setLang(l.code as any)
              setOpenChangeLang(false)
            }
          }))}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 100
  },
  content: {
    flex: 1,
    gap: PADDING_PAGE,
    padding: PADDING_PAGE,
  }
});
