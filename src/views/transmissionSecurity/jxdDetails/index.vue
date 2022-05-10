<template>
  <div class="maintenance-details-content">
    <div class="inner">
      <div class="detail-table-title">佛山地调调度第一种检修申请单</div>
      <!-- <item-menu :methondId="methondId"></item-menu> -->
      <div class="detail-table-item">
        <div class="detail-table-item-title fontWeight">申请填报</div>
        <table
          class="detail-table-item-content"
          cellpadding="0"
          cellspacing="0"
          width="100%"
        >
          <col width="30%" />
          <col width="20%" />
          <col width="13%" />
          <col width="20%" />
          <col width="13%" />
          <col width="21%" />
          <tr>
            <th>申请单编号</th>
            <td colspan="5">{{ tableData.sqdbh }}</td>
          </tr>
          <tr>
            <th>申请单位</th>
            <td colspan="5">{{ tableData.sqdw }}</td>
          </tr>
          <tr>
            <th>提交时间</th>
            <td colspan="5">{{ formatDate(tableData.tjsj) }}</td>
          </tr>
          <tr>
            <th>申请负责人</th>
            <td colspan="5">{{ tableData.sqfzr }}</td>
          </tr>
          <tr>
            <th>联系电话</th>
            <td colspan="5">{{ tableData.sqrlxdh }}</td>
          </tr>
          <tr>
            <th>检修类别</th>
            <td colspan="5">{{ tableData.jxlb }}</td>
          </tr>

          <tr>
            <th class="center">工作内容</th>
            <td colspan="5" class="left" v-html="tableData.gznr"></td>
          </tr>
          <tr>
            <th class="center" rowspan="3" >工作要求的安全措施(调度管辖设备)</th>
            <th class="center">一次设备状态要求</th>
            <td class="center" colspan="4">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.ycsbztyqs && tableData.ycsbztyqs.length > 0"
              >
                <col width="20px" />
                <col />
                <col width="80px" />
                <tr>
                  <th></th>
                  <th>设备名称</th>
                  <th>设备状态</th>
                </tr>
                <tr v-for="(item, index) in tableData.ycsbztyqs" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.sbmc }}</td>
                  <td>{{ item.sbzt }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">二次设备状态要求</th>
            <td class="center" colspan="4">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.ecsbztyqs && tableData.ecsbztyqs.length > 0"
              >
                <col width="20px" />
                <col />
                <col width="80px" />
                <tr>
                  <th></th>
                  <th>设备名称</th>
                  <th>设备状态</th>
                </tr>
                <tr v-for="(item, index) in tableData.ecsbztyqs" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.sbmc }}</td>
                  <td>{{ item.sbzt }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">
              其它要求(通信、自动化及补充描述一次、二次设备状态要求的安全措施）
            </th>
            <td class="center" colspan="4">{{ tableData.qtyq }}</td>
          </tr>

          <tr>
            <th colspan="2">申请工作开始时间</th>
            <td colspan="4">{{ formatDate(tableData.sqgzkssj) }}</td>
          </tr>
          <tr>
            <th colspan="2">申请工作结束时间</th>
            <td colspan="4">{{ formatDate(tableData.sqgzjssj) }}</td>
          </tr>
          <tr>
            <th colspan="2">申请工作时长</th>
            <td colspan="4" v-if="tableData">
              {{ dayInterval(tableData.sqgzkssj, tableData.sqgzjssj) }}
            </td>
          </tr>
          <tr>
            <th colspan="2">申请停电操作开始</th>
            <td colspan="4">{{ formatDate(tableData.sqtdczkssj) }}</td>
          </tr>
          <tr>
            <th colspan="2">申请复电操作结束时间</th>
            <td colspan="4">{{ formatDate(tableData.sqfdczjssj) }}</td>
          </tr>
          <tr>
            <th colspan="2">申请停电时长</th>
            <td colspan="4" v-if="tableData">
              {{ dayInterval(tableData.sqtdczkssj, tableData.sqfdczjssj) }}
            </td>
          </tr>
        </table>
        <br /><br />
        <div class="detail-table-item-title fontWeight">申请签发</div>
        <table
          class="detail-table-item-content"
          cellpadding="0"
          cellspacing="0"
          width="100%"
        >
          <col width="25%" />
          <col width="20%" />
          <col width="13%" />
          <col width="20%" />
          <col width="13%" />
          <col width="21%" />
          <tr>
            <th colspan="2">批准工作开始时间</th>
            <td colspan="4">{{ formatDate(tableData.pzgzkssj) }}</td>
          </tr>
          <tr>
            <th colspan="2">批准工作结束时间</th>
            <td colspan="4">{{ formatDate(tableData.pzgzjssj) }}</td>
          </tr>
          <tr>
            <th colspan="2">批准工作时长</th>
            <td colspan="4" v-if="tableData">
              {{ dayInterval(tableData.pzgzkssj, tableData.pzgzjssj) }}
            </td>
          </tr>
          <tr>
            <th colspan="2">批准停电操作开始</th>
            <td colspan="4">{{ formatDate(tableData.pztdczkssj) }}</td>
          </tr>
          <tr>
            <th colspan="2">批准复电操作结束时间</th>
            <td colspan="4">{{ formatDate(tableData.pztdczjssj) }}</td>
          </tr>
          <tr>
            <th colspan="2">批准停电时长</th>
            <td colspan="4" v-if="tableData">
              {{ dayInterval(tableData.pztdczkssj, tableData.pztdczjssj) }}
            </td>
          </tr>

          <tr>
            <th colspan="2" class="center">关联检修申请单</th>
            <td colspan="4" class="center">{{ tableData.gljxd }}</td>
          </tr>
          <tr>
            <th class="center">方式意见</th>
            <td class="center" colspan="5">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.fsyj && tableData.fsyj.length > 0"
              >
                <col width="20px" />
                <col width="80px" />
                <col width="80px" />
                <col />
                <tr>
                  <th></th>
                  <th>签发意见</th>
                  <th>签发人</th>
                  <th>签发时间</th>
                </tr>
                <tr v-for="(item, index) in tableData.fsyj" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.qfyj }}</td>
                  <td>{{ item.qfr }}</td>
                  <td>{{ item.qfsj }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">安自意见</th>
            <td class="center" colspan="5">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.azyj && tableData.azyj.length > 0"
              >
                <col width="20px" />
                <col width="80px" />
                <col width="80px" />
                <col />
                <tr>
                  <th></th>
                  <th>签发意见</th>
                  <th>签发人</th>
                  <th>签发时间</th>
                </tr>
                <tr v-for="(item, index) in tableData.azyj" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.qfyj }}</td>
                  <td>{{ item.qfr }}</td>
                  <td>{{ item.qfsj }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">保护意见</th>
            <td class="center" colspan="5">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.bhyj && tableData.bhyj.length > 0"
              >
                <col width="20px" />
                <col width="80px" />
                <col width="80px" />
                <col />
                <tr>
                  <th></th>
                  <th>签发意见</th>
                  <th>签发人</th>
                  <th>签发时间</th>
                </tr>
                <tr v-for="(item, index) in tableData.bhyj" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.qfyj }}</td>
                  <td>{{ item.qfr }}</td>
                  <td>{{ item.qfsj }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">通信意见</th>
            <td class="center" colspan="5">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.txyj && tableData.txyj.length > 0"
              >
                <col width="20px" />
                <col width="80px" />
                <col width="80px" />
                <col />
                <tr>
                  <th></th>
                  <th>签发意见</th>
                  <th>签发人</th>
                  <th>签发时间</th>
                </tr>
                <tr v-for="(item, index) in tableData.txyj" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.qfyj }}</td>
                  <td>{{ item.qfr }}</td>
                  <td>{{ item.qfsj }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">自动化意见</th>
            <td class="center" colspan="5">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.zdhyj && tableData.zdhyj.length > 0"
              >
                <col width="20px" />
                <col width="80px" />
                <col width="80px" />
                <col />
                <tr>
                  <th></th>
                  <th>签发意见</th>
                  <th>签发人</th>
                  <th>签发时间</th>
                </tr>
                <tr v-for="(item, index) in tableData.zdhyj" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.qfyj }}</td>
                  <td>{{ item.qfr }}</td>
                  <td>{{ item.qfsj }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">水调意见</th>
            <td class="center" colspan="5">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.sdyj && tableData.sdyj.length > 0"
              >
                <col width="20px" />
                <col width="80px" />
                <col width="80px" />
                <col />
                <tr>
                  <th></th>
                  <th>签发意见</th>
                  <th>签发人</th>
                  <th>签发时间</th>
                </tr>
                <tr v-for="(item, index) in tableData.sdyj" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.qfyj }}</td>
                  <td>{{ item.qfr }}</td>
                  <td>{{ item.qfsj }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">调度意见</th>
            <td class="center" colspan="5">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.ddyj && tableData.ddyj.length > 0"
              >
                <col width="20px" />
                <col width="80px" />
                <col width="80px" />
                <col />
                <tr>
                  <th></th>
                  <th>签发意见</th>
                  <th>签发人</th>
                  <th>签发时间</th>
                </tr>
                <tr v-for="(item, index) in tableData.ddyj" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.qfyj }}</td>
                  <td>{{ item.qfr }}</td>
                  <td>{{ item.qfsj }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center">相关单位/部门意见</th>
            <td class="center" colspan="5">
              <table
                class="table-detail-sub"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                v-if="tableData.xgddjgyj && tableData.xgddjgyj.length > 0"
              >
                <col width="20px" />
                <col width="80px" />
                <col width="80px" />
                <col />
                <tr>
                  <th></th>
                  <th>签发意见</th>
                  <th>签发人</th>
                  <th>签发时间</th>
                </tr>
                <tr v-for="(item, index) in tableData.xgddjgyj" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.qfyj }}</td>
                  <td>{{ item.qfr }}</td>
                  <td>{{ item.qfsj }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th class="center" rowspan="2">批准意见</th>
            <td colspan="5" v-html="tableData.pzyj" style="height: 80px"></td>
          </tr>
          <tr>
            <th>批准人</th>
            <td colspan="1">{{ tableData.pzr }}</td>
            <th>通知时间</th>
            <td colspan="3">{{ formatDate(tableData.tzsj) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import filter from '@utils/filter'
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    tableData: {},
  }),
  mounted() {
    console.log(this.data, 123);
    this.tableData = this.data;
    this.sliceArr(this.data);
  },
  methods: {
    dayInterval(start, end) {
      let t = new Date(end).getTime() - new Date(start).getTime();
      return `${Math.floor(t / 3600 / 24 / 1000)}天`;
    },
    formatDate(datetime) {
      return filter.formaDate(datetime, 'yyyy-MM-dd hh:mm:ss')
    },
    sliceArr(data) {
      if (data.fsyj)
        Object.assign(this.tableData, { fsyj: this.splitArr(data.fsyj) });
      if (data.azyj)
        Object.assign(this.tableData, { azyj: this.splitArr(data.azyj) });
      if (data.bhyj)
        Object.assign(this.tableData, { bhyj: this.splitArr(data.bhyj) });
      if (data.txyj)
        Object.assign(this.tableData, { txyj: this.splitArr(data.txyj) });
      if (data.zdhyj)
        Object.assign(this.tableData, { zdhyj: this.splitArr(data.zdhyj) });
      if (data.sdyj)
        Object.assign(this.tableData, { sdyj: this.splitArr(data.sdyj) });
      if (data.ddyj)
        Object.assign(this.tableData, { ddyj: this.splitArr(data.ddyj) });
    },
    splitArr(str) {
      let arr = str.split(";");
      let len = arr.length;
      let yj = [];
      let list = {};
      for (let i = 1; i <= len; i++) {
        if (i % 3 == 0) {
          yj.push(
            Object.assign({}, list, {
              qfyj: arr[i - 3],
              qfr: arr[i - 2],
              qfsj: this.insertStr(arr[i - 1], 10),
            })
          );
        }
      }
      return yj;
    },
    insertStr(str, index) {
      let tmp = str.split("");
      tmp.splice(index, 0, " ");
      return tmp.join("");
    },
  }
};
</script>

<style lang='scss' scope>
.maintenance-details-content {
  .inner {
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #f0f0f0;
    line-height: 1.6;
  }

  .detail-table-title {
    text-align: center;
    font-size: 18px;
    padding: 24px 0;
  }
  .detail-table-item {
    margin-bottom: 24px;
    font-size: 0.8rem;
  }
  .detail-table-item-title {
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .fontWeight {
    font-weight: bold;
  }
  .detail-table-item-content {
    table-layout: fixed;
    border-collapse: collapse;
    td,
    th {
      border: 1px solid #ebeef5;
      text-align: left;
      padding: 8px 10px;
      &.center {
        text-align: center;
      }
      &.left {
        text-align: left;
      }
      &.tips {
        font-weight: bold;
        background: #fdf6ec;
      }
    }
    th {
      background-color: #f5f9ff;
      font-weight: normal;
      text-align: right;
      &.th-header {
        text-align: center;
        color: #54a7fd;
      }
    }
    .table-detail-sub {
      table-layout: fixed;
      border-collapse: collapse;
      td,
      th {
        text-align: center;
        background: none;
        border: none;
        padding: 5px 0;
      }
      th {
        border-bottom: 1px solid rgba($color: #ebeef5, $alpha: 0.6);
        color: #999;
      }
    }
  }
}
</style>