import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import DeviceDetector from 'device-detector-js';

@Injectable()
export class AccessService {
  private readonly deviceDetector = new DeviceDetector();

  constructor(private prisma: PrismaService) {}

  create(props) {
    const { id, ua, apiName, ip } = props;
    const deviceJson = JSON.stringify(this.deviceDetector.parse(ua));
    return this.prisma.access.create({
      data: {
        userAgent: deviceJson,
        apiName,
        ip,
        user: { connect: { id } },
      },
    });
  }
}
