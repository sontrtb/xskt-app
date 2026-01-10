// screens/note/NoteFormScreen.tsx
import ButtonUi from "@/components/ui/ButtonUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import useTheme from "@/hooks/useColor";
import { toastSuccess } from "@/lib/toast";
import { useNotes } from "@/stores/useNotes";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { validationSchema } from "./validation";

interface INoteForm {
  date: Date;
  title: string;
  content: string;
}

interface RouteParams {
  noteId?: string;
}

function NoteFormScreen() {
  const color = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  const { notes, addNote, updateNote, getNoteById, deleteNote } = useNotes();
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<INoteForm>({
    defaultValues: {
      date: new Date(),
      title: "",
      content: "",
    },
    resolver: yupResolver(validationSchema()),
  });

  // Load dữ liệu nếu đang edit
  useEffect(() => {
    if (params?.noteId) {
      const note = getNoteById(params.noteId);
      if (note) {
        setIsEditMode(true);
        setValue("date", new Date(note.date));
        setValue("title", note.title);
        setValue("content", note.content);
      }
    }
  }, [params?.noteId]);

  const onSubmit: SubmitHandler<INoteForm> = (data) => {
    const dateString = data.date.toISOString().split("T")[0];

    if (isEditMode && params?.noteId) {
      // Cập nhật ghi chú hiện có
      updateNote(params.noteId, {
        date: dateString,
        title: data.title,
        content: data.content,
      });
      toastSuccess("Thành công", "Cập nhật ghi chú thành công");
    } else {
      // Tạo ghi chú mới
      addNote({
        date: dateString,
        title: data.title,
        content: data.content,
      });
      toastSuccess("Thành công", "Tạo ghi chú thành công");
    }
    
    navigation.goBack();
  };

  const handleDelete = () => {
    if (params?.noteId) {
      deleteNote(params.noteId);
      toastSuccess("Thành công", "Xóa ghi chú thành công");
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.root, { backgroundColor: color.bg }]}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <View>
              <TextUi
                allowFontScaling={false}
                style={[styles.title, { color: color.primary }]}
              >
                {isEditMode ? "Cập nhật ghi chú" : "Tạo ghi chú mới"}
              </TextUi>
              <View style={[styles.divider, { backgroundColor: color.primary }]} />
            </View>
            
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <TextUi style={[styles.closeText, { color: color.textSecondary }]}>
                ✕
              </TextUi>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePickerUi
                  label="Ngày"
                  value={field.value}
                  onChange={field.onChange}
                  errorText={errors.date?.message}
                  placeholder="Chọn ngày"
                />
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInputUi
                  label="Tiêu đề"
                  placeholder="Nhập tiêu đề"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextInputUi
                  label="Nội dung"
                  placeholder="Nhập nội dung ghi chú..."
                  value={field.value}
                  onChangeText={field.onChange}
                  errorText={errors.content?.message}
                  numberOfLines={8}
                  multiline
                />
              )}
            />
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <ButtonUi
            text={isEditMode ? "Cập nhật" : "Tạo ghi chú"}
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          />

          {isEditMode && (
            <ButtonUi
              text="Xóa ghi chú"
              style={[styles.button, { backgroundColor: color.error }]}
              onPress={handleDelete}
            />
          )}

          <ButtonUi
            text="Hủy"
            style={[styles.button, { backgroundColor: color.secondary }]}
            onPress={handleCancel}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default NoteFormScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: PADDING_PAGE,
    paddingVertical: PADDING_PAGE,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },
  divider: {
    width: 80,
    height: 2,
    marginBottom: 8,
    marginTop: 8,
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    fontWeight: "300",
  },
  card: {
    gap: 24,
    marginTop: 28,
    width: "100%",
  },
  buttonGroup: {
    gap: 12,
    marginTop: PADDING_PAGE,
  },
  button: {
    marginTop: 0,
  },
});