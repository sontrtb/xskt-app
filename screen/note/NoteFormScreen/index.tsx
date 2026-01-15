import ButtonUi from "@/components/ui/ButtonUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import KeyboardAvoidingViewUi from "@/components/ui/KeyboardAvoidingViewUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import useTheme from "@/hooks/useColor";
import { toastSuccess } from "@/lib/toast";
import { INote, useNotes } from "@/stores/useNotes";
import { PADDING_PAGE } from "@/theme/layout";
import analytics from '@react-native-firebase/analytics';
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

function NoteFormScreen() {
  const color = useTheme();

  const { otherParam } = useLocalSearchParams();

  const isEditMode = !!otherParam;
  const defaultValues: INote | undefined = otherParam ? JSON.parse(otherParam as string) : undefined

  const router = useRouter()

  const { notes, addNote, updateNote } = useNotes();

  useEffect(() => {
    analytics().logScreenView({
      screen_name: 'NoteFormScreen',
    });
  }, [])

  const {
    handleSubmit,
    control,
  } = useForm<INote>({
    defaultValues: defaultValues ?? { date: moment.utc(new Date()).local().format("DD-MM-YYYY") }
  });


  const onSubmit: SubmitHandler<INote> = (data) => {
    if (isEditMode) {
      updateNote(defaultValues!.date, data);
      toastSuccess("Thành công", "Cập nhật ghi chú thành công");
    } else {
      // Kiểm tra xem đã có ghi chú nào trong ngày này chưa
      const existingNote = notes.find(note => note.date === data.date);

      if (existingNote) {
        // Nếu đã tồn tại, gộp nội dung với dấu "+"
        const mergedContent = `${existingNote.content}\n+ ${data.content}`;
        updateNote(data.date, { ...data, content: mergedContent });
        toastSuccess("Thành công", "Đã thêm nội dung vào ghi chú ngày này");
      } else {
        // Nếu chưa tồn tại, thêm dấu "+" trước nội dung
        addNote({ ...data, content: `+ ${data.content}` });
        toastSuccess("Thành công", "Tạo ghi chú thành công");
      }
    }

    router.back()
  };

  return (
    <KeyboardAvoidingViewUi
      style={[styles.root, { backgroundColor: color.bg }]}
      contentContainerStyle={styles.contentStyle}
    >
      <View style={styles.formContainer}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <View style={styles.fieldContainer}>
              <TextUi style={styles.label}>Ngày</TextUi>
              <DatePickerUi
                value={field.value}
                onChange={field.onChange}
              />
            </View>
          )}
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextInputUi
              label="Nội dung"
              placeholder="Ví dụ: Anh An số 20 - 30 điểm"
              value={field.value}
              onChangeText={field.onChange}
              multiline
              height={300}
            />
          )}
        />
      </View>

      <ButtonUi
        style={{marginTop: PADDING_PAGE}}
        text={isEditMode ? "Cập nhật" : "Tạo ghi chú"}
        onPress={handleSubmit(onSubmit)}
      />
    </KeyboardAvoidingViewUi>
  );
}

export default NoteFormScreen;

const styles = StyleSheet.create({
  root: {
    // flex: 1,
  },
  contentStyle: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: PADDING_PAGE
  },
  formContainer: {
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "500",
    marginBottom: 4
  }
});