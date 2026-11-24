import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "@react-pdf/tailwind";
import type { PatientFormatted } from "../types/Patients";

const tw = createTw({
  colors: { custom: "#000" },
  fontSize: {
    base: 10,
  },
});

const styles = StyleSheet.create({
  document: {
    padding: 0,
    margin: 0,
  },
  page: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
    paddingHorizontal: "30px",
    width: "100%",
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "normal",
  },
  borderText: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 12,
    padding: 5,
    whiteSpace: "now-rap",
  },
  borderTextLeft: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    fontSize: 12,
    padding: 5,
  },
  containerRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  containerColumn: {
    display: "flex",
    flexDirection: "column",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#000",
    width: "100%",
  },
});

const PdfTreatmentPlan = ({ patient }: { patient: PatientFormatted }) => {
  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <Image
          src="/resources/MdCodes_FullBlack_v2.png"
          style={{ width: 220, height: "auto" }}
        />
        <View style={tw("flex flex-col gap-2")}>
          <Text style={styles.text}>
            Name: {patient.name}
          </Text>
          <Text style={styles.text}>Age: {patient.age}</Text>

          <Text style={styles.text}>
            Total Treatment's: {patient.treatmentPlan.length}
          </Text>
        </View>

        <View style={styles.containerColumn}>
          <View style={styles.containerRow}>
            <Text style={styles.borderText}>Treatment Date</Text>
            <Text style={styles.borderText}>Code</Text>
            <Text style={styles.borderText}>Product</Text>
            <Text style={styles.borderText}>Right</Text>
            <Text style={styles.borderText}>Mid</Text>
            <Text style={styles.borderText}>Left</Text>
          </View>
          {patient.treatmentPlan.map((item) => (
            <View key={item.createdAt}>
              {item.cart.map((value, index) => (
                <View
                  key={value.code + "-" + index}
                  style={styles.containerRow}
                >
                  <Text style={styles.borderText}>
                    {index === 0 ? item.dateTreatment : ""}
                  </Text>
                  <Text style={styles.borderText}>{value.code}</Text>
                  <Text style={styles.borderText}>{value.product}</Text>
                  <Text style={styles.borderText}>{value.right}</Text>
                  <Text style={styles.borderText}>{value.mid}</Text>
                  <Text style={styles.borderText}>{value.left}</Text>
                </View>
              ))}
              <View style={styles.containerRow}>
                <Text style={styles.borderTextLeft}>
                  Total for this section:{" "}
                  {item.cart
                    .reduce(
                      (acc, total) =>
                        acc +
                        (Number(total.left) +
                          Number(total.mid) +
                          Number(total.right)),
                      0
                    )
                    .toFixed(2)}{" "}
                  ml
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Text
          style={{
            ...styles.text,
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
          }}
        >
          Total applied: {""}
          {patient.treatmentPlan
            .reduce(
              (acc, item) =>
                acc +
                item.cart.reduce(
                  (volumes, qntd) =>
                    volumes +
                    (parseFloat(qntd.left) +
                      parseFloat(qntd.mid) +
                      parseFloat(qntd.right)),
                  0
                ),
              0
            )
            .toFixed(2)}
          ml
        </Text>
      </Page>
    </Document>
  );
};

export default PdfTreatmentPlan;
